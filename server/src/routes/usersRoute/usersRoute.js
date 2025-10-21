const express = require("express");
const router = express.Router();
const { register, login, current, googleAuthCallback, updatePassword, refresh } = require("../../controllers/users.controller");
const { validateAccessToken } = require("../../middlewares/validateAccesstoken");
const passport = require("passport");
const { validateRefreshToken } = require("../../middlewares/validateRefreshToken");




// basic authentication
router.route('/users/register').post(register);
router.route('/users/login').post(login);
router.route('/users/current').get(validateAccessToken,current);
router.route('/users/refresh').get(validateRefreshToken,refresh);

// Oauth 2.0 authentication
router.route("/users/google").get(passport.authenticate("google", { scope: ["profile", "email"] }));
router.route("/users/google/callback").get(passport.authenticate("google", { session: false }),googleAuthCallback);
router.route("/users/update-password").put(validateAccessToken,updatePassword);


module.exports = router;