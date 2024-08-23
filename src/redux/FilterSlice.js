// Slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRelevance: [],
  selectedJobTypes: [],
  selectedLevels: [],
  jobID: "",
  postPage: false,
  talentID: "",
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
    getTalentID: (state, action) => {
      state.talentID = action.payload;
    },
    resetToDefault: (state) => {
      state.selectedRelevance = [];
      (state.selectedJobTypes = []), (state.selectedLevels = []);
    },
    postPageTrue: (state) => {
      state.postPage = true;
    },
  },
});
export const {
  setSelectedRelevance,
  setSelectedJobTypes,
  setSelectedLevels,
  getJobID,
  getTalentID,
  resetToDefault,
  postPageTrue,
} = FilterSlice.actions;

export default FilterSlice.reducer;
