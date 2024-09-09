// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const initialState = {
  nearByJobs: [],
  loading: false,
  error: "",
  displayJob: false,
  showOptions: false,
  currentPage: "",
  showJobListing: false,
  jobTitle: "",
  showSavedJob: false,
};

const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const fetchNearJob = createAsyncThunk(
  "nearJob/fetchNearJob",
  async (url) => {
    // if (!token.authKey) {
    //   navigate("/login");
    //   return;
    // }
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
        return data.filter((job) => job.jobStatus === "ACCEPTED");
      });
  }
);
const nearJobSlice = createSlice({
  name: "nearbyJob",
  initialState,
  reducers: {
    showOptions: (state) => {
      state.showOptions = true;
    },
    closeOptions: (state) => {
      state.showOptions = false;
    },
    // getCurrentPage: (state, action) => {
    //   state.currentPage = action.payload;
    // },
    // resetJobDisplay: (state) => {
    //   // state.displayJob = false;
    //   state.showJobListing = false;
    // },
    // getJobTitle: (state, action) => {
    //   state.jobTitle = action.payload;
    // },
  },
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
        // state.currentPage === "dashboard"
        //   ? (state.displayJob = true)
        //   : state.currentPage === "jobListing"
        //   ? (state.showJobListing = true)
        //   : state.currentPage === "saved"
        //   ? (state.showSavedJob = true)
        //   : null;
      })
      .addCase(fetchNearJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.nearByJobs = [];
      });
  },
});
export const {
  showOptions,
  closeOptions,
  // getCurrentPage,
  // resetJobDisplay,
  // getJobTitle,
} = nearJobSlice.actions;

export default nearJobSlice.reducer;
