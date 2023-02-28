import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { signin, signup } from "../api";

export const googleAuth = createAsyncThunk(
  "google/googleAuth",
  async (response, thunkAPI) => {
    try {
      const decoded = await jwt_decode(response.credential);
      return { decoded, response };
    } catch (error) {
      console.log(error);
    }
  }
);
export const signIn = createAsyncThunk(
  "signin/manual",
  async ({ formData,navigate }) => {
    try {
      const { data } = await signin(formData);
      navigate("/")
      return data;
    } catch (error) {
      // console.log("error",error.message);
      alert("either your email or password incorrect")
    }
  }
);
export const signUp = createAsyncThunk(
  "signup/manual",
  async ({ formData ,navigate}) => {
    try {
      const { data } = await signup(formData);
      navigate("/")
      return data;
    } catch (error) {
      // console.log(error);
      alert("either you are already a user or your passwords don't match")
    }
  }
);
const initialState = { authData: null, token: "" };
const userSlice = createSlice({
  name: "userauth",
  initialState,
  reducers: {
    logOut: (state) => {
      // console.log("bdocub");
      localStorage.removeItem("profile");
      state = { authData: null, token: "" };
      // console.log(state);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        googleAuth.fulfilled,
        (state, { payload: { response, decoded } }) => {
          // console.log("cdbk")
          // console.log(action.payload)
          state.authData = decoded;
          state.token = response.credential;
          //   console.log(state.token);
          localStorage.setItem("profile", JSON.stringify(state));
          return state;
        }
      )
      .addCase(signIn.fulfilled, (state, { payload: { result, token } }) => {
        localStorage.setItem(
          "profile",
          JSON.stringify({ ...state, authData: result, token })
        );
        return { ...state, authData: result, token };
      })
      .addCase(signUp.fulfilled, (state, { payload: { result, token } }) => {
        localStorage.setItem(
          "profile",
          JSON.stringify({ ...state, authData: result, token })
        );
        return { ...state, authData: result, token };
      });
  },
});
export const { logOut } = userSlice.actions;
export default userSlice.reducer;
