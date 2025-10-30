import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  user: null,
  status: "idle",
  error: "",
  message: "",
  authError: "",
}

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email,
        password,
      },{
        withCredentials: true,
      })

      // Lưu token vào localStorage
      localStorage.setItem('access_token', response.data.accessToken)
      
      
      return response.data.user
    } catch (error) {
      // Lấy message từ server (nếu có)
      const message =
        error.response?.data?.message || error.message || 'Login failed'
      return rejectWithValue(message)
    }
  }
)

// export const loginByGoogle = createAsyncThunk(
//   'user/loginByGoogle',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/users/google/callback',{
//         withCredentials: true,
//       })

//       localStorage.setItem('access_token', response.data.accessToken)

//       return response.data.user
//     } catch (error) {

//       const message =
//         error.response?.data?.message || error.message || 'Login failed'
//       return rejectWithValue(message)
//     }
//   }
// )

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', {
        email,
        password,
      })
      return response.data.message
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Register failed';

      return rejectWithValue(message)
    }
  }
)

export const refresh = createAsyncThunk(
  'user/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/refresh', {
        withCredentials: true,
      })
      localStorage.setItem('access_token', response.data.accessToken)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Refresh failed';
      return rejectWithValue(message)
    }
  }
)

export const current = createAsyncThunk(
  'user/current', 
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.get('http://localhost:8000/api/users/current', {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      return response.data.user
    } catch (error) {
      
      return rejectWithValue(error.response?.data?.message || 'Get current failed')
    }
  }
)

export const userSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null
      state.status = "idle"
      state.error = ""
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "successed";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "successed";
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // .addCase(loginByGoogle.pending, (state) => {
      //   state.status = 'loading'
      // })
      // .addCase(loginByGoogle.fulfilled, (state, action) => {
      //   state.status = 'succeeded'
      //   state.user = action.payload
      // })
      // .addCase(loginByGoogle.rejected, (state, action) => {
      //   state.status = 'failed'
      //   state.error = action.payload || action.error.message;
      // })
      .addCase(refresh.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(refresh.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = 'failed'
        state.authError = action.payload || action.error.message;
      })
      .addCase(current.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(current.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(current.rejected, (state, action) => {
        state.status = 'failed'
        state.authError = action.payload || action.error.message;
      })
  },

})


export const { resetUserState } = userSlice.actions
export default userSlice.reducer