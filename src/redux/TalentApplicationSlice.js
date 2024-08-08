// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
import axios from "axios";
const initialState = {
  loading: false,
  error: false,
  success: false,
  jobPostingId: "",
};
const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const applyForJob = createAsyncThunk(
  "apply/applyJob",
  async (url, jobPostingId) => {
    console.log(jobPostingId);
    try {
      const res = await axios.post(
        `${API_HOST_URL}/api/job-postings/${jobPostingId}/apply`,
        jobPostingId,

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

const TalentApplicationSlice = createSlice({
  name: "applyForJob",
  initialState,
  reducers: {
    // getJobID: (state, action) => {
    //   const id = action.payload;
    //   state.jobPostingId = { jobPostingId: id.jobPostingId };
    //   console.log(state.jobPostingId);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  },
});
export const { getJobID } = TalentApplicationSlice.actions;

export default TalentApplicationSlice.reducer;
