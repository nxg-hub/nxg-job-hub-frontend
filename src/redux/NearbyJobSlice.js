// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";

const initialState = {
  nearByJobs: [],
  loading: false,
  error: "",
  displayJob: false,
};

const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const fetchNearJob = createAsyncThunk(
  "nearJob/fetchNearJob",
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
const nearJobSlice = createSlice({
  name: "nearbyJob",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.nearByJobs = action.payload;
        state.displayJob = true;
      })
      .addCase(fetchNearJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.nearByJobs = [];
      });
  },
});
export const {} = nearJobSlice.actions;

export default nearJobSlice.reducer;
