// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const initialState = {
  jobListingerror: false,
  successJobListing: false,
  notice: false,
  jobListingLoader: false,
  multipleJobListingApp: "",
  multiApplyErr: false,
};
const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const applyInJobListing = createAsyncThunk(
  "apply/applyJob",
  async (id, { rejectWithValue }) => {
    // if (!token.authKey) {
    //   navigate("/login");
    //   return;
    // }
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
      return rejectWithValue(error.response.data);
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
      state.jobListingerror = false;
    },
    setNoticeTruejobListing: (state) => {
      state.notice = true;
    },
    setNoticeFalsejobListing: (state) => {
      state.notice = false;
    },
    setMultiApplyErrTrue: (state) => {
      state.multipleJobListingApp ===
      "You have already applied to this job. Multiple applications are not allowed."
        ? (state.multiApplyErr = true)
        : (state.jobListingerror = false);
      // ? (state.jobListingerror = true)
      // : null;
    },
    setMultiApplyErrFalse: (state) => {
      state.multiApplyErr = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyInJobListing.pending, (state) => {
        state.jobListingLoader = true;
        state.jobListingerror = false;
      })
      .addCase(applyInJobListing.fulfilled, (state, action) => {
        state.jobListingLoader = false;
        state.jobListingerror = false;
        state.successJobListing = true;
      })
      .addCase(applyInJobListing.rejected, (state, action) => {
        state.jobListingLoader = false;
        state.multipleJobListingApp = action.payload;
        state.multipleJobListingApp !==
        "You have already applied to this job. Multiple applications are not allowed."
          ? (state.jobListingerror = true)
          : null;
        state.successJobListing = false;
      });
  },
});
export const {
  closeModaljobListing,
  closeErrorModaljobListing,
  setNoticeTruejobListing,
  setNoticeFalsejobListing,
  setMultiApplyErrTrue,
  setMultiApplyErrFalse,
} = jobListingApplicationSlice.actions;

export default jobListingApplicationSlice.reducer;
