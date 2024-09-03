// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const initialState = {
  loading: false,
  error: false,
  successSaved: false,
  notice: false,
  jobListingLoader: false,
  currentPage: "",
  saveMultiApplyErr: false,
  multiApp: "",
};
const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
export const applyForJob = createAsyncThunk(
  "apply/applyJob",
  async (id, { rejectWithValue }) => {
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

const TalentApplicationSlice = createSlice({
  name: "applyForJob",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.successSaved = false;
    },
    closeErrorModal: (state) => {
      state.error = false;
    },
    setNoticeTrue: (state) => {
      state.notice = true;
    },
    setNoticeFalse: (state) => {
      state.notice = false;
    },
    getCurrentAppPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.jobListingLoader = true;
        state.error = false;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.successSaved = true;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.jobListingLoader = false;
        state.multiApp = action.payload;
        state.error = true;
        state.successSaved = false;
      });
  },
});
export const {
  closeModal,
  closeErrorModal,
  setNoticeTrue,
  setNoticeFalse,
  getCurrentAppPage,
} = TalentApplicationSlice.actions;

export default TalentApplicationSlice.reducer;
