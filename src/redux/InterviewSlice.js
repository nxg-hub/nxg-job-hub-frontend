// Slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interviewForm: false,
  applicantID: "",
  feedbackForm: false,
};

const InterviewSlice = createSlice({
  name: "InterviewSlice",
  initialState,
  reducers: {
    setInterviewFormTrue: (state, action) => {
      state.interviewForm = true;
      state.applicantID = action.payload;
    },
    setInterviewFormFalse: (state) => {
      state.interviewForm = false;
    },
    setFeedBackFormTrue: (state, action) => {
      state.feedbackForm = true;
      state.applicantID = action.payload;
    },
    setFeedBackFormFalse: (state) => {
      state.feedbackForm = false;
    },
  },
});
export const {
  setInterviewFormTrue,
  setInterviewFormFalse,
  setFeedBackFormTrue,
  setFeedBackFormFalse,
} = InterviewSlice.actions;

export default InterviewSlice.reducer;
