import { API_HOST } from "@/config";
import { payloadLogin, payloadRegister } from "@/typings/payloadApi";
import { alertMessage } from "@/utils/alertMessage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { persistStore } from "redux-persist";
import { store } from "../store";

interface AuthState {
  data: any;
  isError: boolean | null;
  isLoading: boolean | null;
  message: string | null | unknown;
  isSuccess: boolean;
  isLogin: boolean;
  userData:
    | {
        name: string;
        username: string;
        exp: string;
        iat: string;
      }
    | JwtPayload;
}

const initialState: AuthState = {
  data: null,
  isError: null,
  isLoading: false,
  message: null,
  isSuccess: false,
  isLogin: false,
  userData: {
    name: "",
    username: "",
    exp: "",
    iat: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthRedux: (state) => {
      state.data = null;
      state.isLoading = null;
      state.isError = false;
      state.message = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRegister.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(postRegister.rejected, (state, err) => {
      state.isError = true;
      state.isLoading = false;
      state.message = (err.payload as { message: string }).message;
    });

    builder.addCase(postLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.message = action?.payload?.data?.message;
      state.isLoading = false;
      state.isSuccess = true;
      state.isLogin = action?.payload?.data?.data?.token ? true : false;
      state.userData = jwt.decode(
        action?.payload?.data?.data?.token
      ) as JwtPayload;
    });
    builder.addCase(postLogin.rejected, (state, err) => {
      state.isError = true;
      state.isLoading = false;
      state.message = (err.payload as { message: string }).message;
    });

    builder.addCase(postLogout.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postLogout.fulfilled, (state, action) => {
      state.message = action?.payload?.data?.message;
      state.isLoading = false;
      state.isSuccess = true;
      state.isLogin = false;
      state.userData = { name: "", username: "", exp: "", iat: "" };
    });
    builder.addCase(postLogout.rejected, (state, err) => {
      state.isError = true;
      state.isLoading = false;
      state.message = (err.payload as { message: string }).message;
    });
  },
});

export const postRegister = createAsyncThunk(
  "postRegister",
  async (formData: payloadRegister, thunkAPI) => {
    try {
      const data = await axios.post(`${API_HOST}auth/register`, formData);
      alertMessage(data.data.message, "success");
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data || "Something went wrong";
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const postLogin = createAsyncThunk(
  "postLogin",
  async (formData: payloadLogin, thunkAPI) => {
    try {
      const res = await axios.post(`${API_HOST}auth/login`, formData);
      const token = `Bearer ${res.data.data.token}`;
      Cookies.set("tokenLogin", token, { expires: 7 });
      alertMessage(res.data.message, "success");
      return res;
    } catch (err) {
      if (err instanceof AxiosError) {
        alertMessage(err.response?.data?.message, "error");
        const errorMessage = err.response?.data || "Something went wrong";
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const postLogout = createAsyncThunk(
  "postLogout",
  async (_, thunkAPI) => {
    try {
      const token: string = Cookies.get("tokenLogin") || "";
      const res = await axios.post(`${API_HOST}auth/logout`, null, {
        headers: {
          Authorization: token,
        },
      });
      if (res) {
        const persistor = persistStore(store);
        Cookies.remove("tokenLogin");
        persistor.purge();
        thunkAPI.dispatch({ type: "LOGOUT" });
        window.location.assign("/auth/login");
        return res;
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data || "Something went wrong";
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const { resetAuthRedux } = authSlice.actions;

export default authSlice.reducer;
