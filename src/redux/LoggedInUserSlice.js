// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";

const initialState = {
  loggedInUser: [],
  loading: false,
  error: false,
};

const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const fetchLoggedInUser = createAsyncThunk(
  "logedInUser/fetchUser",
  async (url) => {
    return await fetch(`${API_HOST_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.authKey,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
);
const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.loggedInUser = action.payload;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const {} = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
