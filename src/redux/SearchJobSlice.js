// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";

const initialState = {
  searchedJob: [],
  loading: false,
  error: "",
  displayJob: false,
  //   showOptions: false,
  currentPage: "",
  showJobListing: false,
  jobTitle: "",
  showSavedJob: false,
};

const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const searchJob = createAsyncThunk("nearJob/searchJob", async (url) => {
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
});
const searchJobSlice = createSlice({
  name: "searchJob",
  initialState,
  reducers: {
    // showOptions: (state) => {
    //   state.showOptions = true;
    // },
    // closeOptions: (state) => {
    //   state.showOptions = false;
    // },
    getCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetJobDisplay: (state) => {
      // state.displayJob = false;
      state.showJobListing = false;
    },
    getJobTitle: (state, action) => {
      state.jobTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.searchedJob = action.payload;
        state.currentPage === "dashboard"
          ? (state.displayJob = true)
          : state.currentPage === "jobListing"
          ? (state.showJobListing = true)
          : state.currentPage === "saved"
          ? (state.showSavedJob = true)
          : null;
      })
      .addCase(searchJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchedJob = [];
      });
  },
});
export const {
  //   showOptions,
  //   closeOptions,
  getCurrentPage,
  resetJobDisplay,
  getJobTitle,
} = searchJobSlice.actions;

export default searchJobSlice.reducer;
