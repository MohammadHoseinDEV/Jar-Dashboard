import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const initialState = {
  token: Cookies.get("token") || null,
  loading: false,
  error: "",
  userInfo: null,
};

const registerUser = createAsyncThunk("auth/register", async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5257/api/Auth/register",
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error.message || "حطای ناشناخته");
  }
});

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ personnelCode, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:5257/api/Auth/login",
        {
          personnelCode,
          password,
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "خطای ناشناخته");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      Cookies.remove("token");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set("token", action.payload, { expires: 30 });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.token = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.token) {
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, { expires: 30 });
        state.error = "";
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.token = null;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      if (!action.payload) return;
      state.token = action.payload.token || null;
      Cookies.set("token", action.payload.token, { expires: 30 });
      state.userInfo = action.payload.userInfo;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.userInfo = null;
      state.error = action.error.message || "خطا در ثبت نام";
    });
  },
});

export { loginUser, registerUser };

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
