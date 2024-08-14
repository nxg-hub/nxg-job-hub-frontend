// Slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRelevance: [],
  selectedJobTypes: [],
  selectedLevels: [],
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
  },
});
export const { setSelectedRelevance, setSelectedJobTypes, setSelectedLevels } =
  FilterSlice.actions;

export default FilterSlice.reducer;
