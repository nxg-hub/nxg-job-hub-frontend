// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
import axios from "axios";
const initialState = {
  error: false,
  successJobListing: false,
  notice: false,
  jobListingLoader: false,
};
const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const applyInJobListing = createAsyncThunk(
  "apply/applyJob",
  async (id) => {
    try {
      const res = await axios.post(
        `${API_HOST_URL}/api/job-postings/${id.jobPostingId}/apply`,
        id,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
);

const jobListingApplicationSlice = createSlice({
  name: "applyForJob",
  initialState,
  reducers: {
    closeModaljobListing: (state) => {
      state.successJobListing = false;
    },
    closeErrorModaljobListing: (state) => {
      state.error = false;
    },
    setNoticeTruejobListing: (state) => {
      state.notice = true;
    },
    setNoticeFalsejobListing: (state) => {
      state.notice = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyInJobListing.pending, (state) => {
        state.jobListingLoader = true;
        state.error = false;
      })
      .addCase(applyInJobListing.fulfilled, (state, action) => {
        state.jobListingLoader = false;
        state.error = false;
        state.successJobListing = true;
      })
      .addCase(applyInJobListing.rejected, (state, action) => {
        state.jobListingLoader = false;
        state.error = true;
        state.successJobListing = false;
      });
  },
});
export const {
  closeModaljobListing,
  closeErrorModaljobListing,
  setNoticeTruejobListing,
  setNoticeFalsejobListing,
} = jobListingApplicationSlice.actions;

export default jobListingApplicationSlice.reducer;
