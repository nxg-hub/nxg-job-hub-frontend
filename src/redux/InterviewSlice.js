// Slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = { interviewForm: false, applicantID: "" };

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
  },
});
export const { setInterviewFormTrue, setInterviewFormFalse } =
  InterviewSlice.actions;

export default InterviewSlice.reducer;
