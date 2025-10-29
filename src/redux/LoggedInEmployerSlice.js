// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const initialState = {
  loggedInEmployer: [],
  loading: false,
  error: false,
};

const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const fetchLoggedInEmployer = createAsyncThunk(
  "loggedInEmployer/fetchUser",
  async (url) => {
    return await fetch(`${API_HOST_URL}/api/employers/get-employer`, {
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
const loggedInEmployerSlice = createSlice({
  name: "loggedInEmployer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInEmployer.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLoggedInEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.loggedInEmployer = action.payload;
      })
      .addCase(fetchLoggedInEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const {} = loggedInEmployerSlice.actions;

export default loggedInEmployerSlice.reducer;
