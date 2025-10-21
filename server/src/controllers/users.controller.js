const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require("jsonwebtoken");
const Refresh = require('../models/refresh');
const { nowVN } = require("../utils/time");

//@desc Register User
//@route POST /api/users/register
//@access public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  // input validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required.")
  }
  // exist validation
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    res.status(400);
    throw new Error("Email is already registered.")
  }

  // main logic
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    role: role || 'user',
  });

  const { password: _, ...userData } = newUser.get({ plain: true });

  res.status(201).json({
    message: 'User registered successfully.',
    user: userData,
  });

})


//@desc Login User
//@route POST /api/users/login
//@access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.useragent;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required.');
  }

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign(
      {
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }, process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    Refresh.create({
      email: user.email,
      name: user.name,
      deviceInfo: {
        ipAddress: ipAddress,
        userAgent: userAgent.browser,
      },
      token: refreshToken,
      time: nowVN()
    })

    // 30 * 24 * 60 * 60 * 1000 = 30 days
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
      // path: "/"
    });

    return res.status(200).json({
      accessToken,
      message: 'Login successful',
    });
  } else {
    res.status(401);
    throw new Error('Email or password is not valid.');
  }
});

//@desc Current User
//@route GET /api/users/current
//@access private
const current = (req, res) => {
  console.log(req.user);

  const info = {
    user_id: req.user.user_id,
    google_id: req.user.google_id,
    name: req.user.name,
    avatar: req.user.avatar,
    email: req.user.email,
    phone: req.user.phone,
    address: req.user.address,
    role: req.user.role
  }
  res.status(200).json(info);
};

//@desc Logout User
//@route POST /api/users/logout
//@access public
const logout = asyncHandler(async (req, res) => {
  const { email, token } = req.body;

  res.status(200).json({ message: "Log out successful" });
});

//@desc Refresh User
//@route POST /api/users/refresh
//@access private
const refresh = asyncHandler((req, res) => {
  // generate access token
  const accessToken = jwt.sign(
    {
      user: {
        id: req.user_id,
        name: req.name,
        email: req.email,
        role: req.role,
      },
    }, process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    accessToken
  });
});


//@desc Oauth 2.0
//@route POST /api/users/google/callback
//@access private
const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.useragent;
    if (!user) {
      return res.status(400).json({ message: "User not found in request" });
    }

    const token = jwt.sign(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || "user",
        },
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }, process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    Refresh.create({
      email: user.email,
      name: user.name,
      deviceInfo: {
        ipAddress: ipAddress,
        userAgent: userAgent.browser,
      },
      token: refreshToken,
      time: nowVN()
    })

    // 30 * 24 * 60 * 60 * 1000 = 30 days
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
      // path: "/"
    });

    return res.status(200).json({
      message: "Login with Google successful",
      token,
    });
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    return res.status(500).json({
      message: "Internal Server Error during Google OAuth",
      error: error.message,
    });
  }
};

const updatePassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user?.user_id; // lấy từ JWT middleware

  if (!newPassword) {
    res.status(400);
    throw new Error("New password is required");
  }

  // Lấy user từ DB
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Nếu user đã có password thì không cho đổi kiểu này (chỉ cho OAuth user)
  if (user.password) {
    res.status(400);
    throw new Error("This account already has a password.");
  }

  // Mã hoá và lưu lại password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await user.save();

  res.status(200).json({
    message: "Password has been successfully set.",
  });
});


module.exports = { register, login, current, logout, refresh, googleAuthCallback, updatePassword }