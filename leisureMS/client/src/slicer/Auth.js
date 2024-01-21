import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "../slicer/requestHandler";
import { thunkError } from "./Coupons";

const API_URL = "auth";
export const gettate = () => {
  try {
    const user = localStorage.getItem("user");
    if (user === null) return undefined;
    return JSON.parse(user);
  } catch (error) {
    return undefined;
  }
};

const initialState = {
  user: gettate(),
  status: "idle",
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "user/register",
  async (credentials, { rejectWithValue }) => {
    try {
      return await requestHandler.axioPost(`${API_URL}/register`, credentials);
    } catch (error) {
      const message = thunkError(error);
      return rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "user/login",
  async (signupData, { rejectWithValue }) => {
    try {
      console.log(signupData)
      return await requestHandler.axioPost(`${API_URL}/login`, signupData);
    } catch (error) {
      const message = thunkError(error);
      return rejectWithValue(message);
    }
  }
);

// Login user
export const resetLink = createAsyncThunk(
  "user/reset_link",
  async (resetInfo, { rejectWithValue }) => {
    try {
      return await requestHandler.axioPost(`${API_URL}/reset_link`, resetInfo);
    } catch (error) {
      const message = thunkError(error);
      return rejectWithValue(message);
    }
  }
);
// reset_password
export const resetPassword = createAsyncThunk(
  "user/reset",
  async (resetInfo, { rejectWithValue }) => {
    try {
      const { token, id, password } = resetInfo
      return await requestHandler.axioPost(`${API_URL}/reset_password/${id}/${token}`, { password });
    } catch (error) {
      const message = thunkError(error);
      return rejectWithValue(message);
    }
  }
);
export const confirmEmail = createAsyncThunk(
  "user/confirmation",
  async (resetInfo, { rejectWithValue }) => {
    try {
      const {token, id}  = resetInfo 
      return await requestHandler.axioGet(`${API_URL}/confirmation/${id}/${token}`);
    } catch (error) {
      const message = thunkError(error);
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, ThunkAPI) => {
  try {
    return await requestHandler.axioGet(`${API_URL}/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return ThunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
    reseter: (state) => {
      state.status = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // register section 
    builder.addCase(register.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.user = null;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload
    });
    // login section 
    builder.addCase(login.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      console.warn(payload)
      localStorage.setItem("user", JSON.stringify(payload.data));
      state.user = payload.data;
    });
    // logout section 
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.user = null;
    });

    // resetPassword section 
    builder.addCase(resetPassword.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.data?.message;
    });
    // resetLink section 
    builder.addCase(resetLink.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(resetLink.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
    builder.addCase(resetLink.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.data?.message;
    });

  }
});
export const getUser = (state) => state?.auth;
export const getCurrentUser = (state) => state?.auth?.user;
export const { setLogout, reseter } = authSlice.actions;
export default authSlice.reducer;