// Slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRelevance: [],
  selectedJobTypes: [],
  selectedLevels: [],
  jobID: "",
};

const FilterSlice = createSlice({
  name: "FilterSlice",
  initialState,
  reducers: {
    setSelectedRelevance: (state, action) => {
      state.selectedRelevance = action.payload;
    },
    setSelectedJobTypes: (state, action) => {
      state.selectedJobTypes = action.payload;
    },
    setSelectedLevels: (state, action) => {
      state.selectedLevels = action.payload;
    },
    getJobID: (state, action) => {
      state.jobID = action.payload;
    },
  },
});
export const {
  setSelectedRelevance,
  setSelectedJobTypes,
  setSelectedLevels,
  getJobID,
} = FilterSlice.actions;

export default FilterSlice.reducer;
