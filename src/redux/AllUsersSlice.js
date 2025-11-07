// Slice
import { createSlice } from "@reduxjs/toolkit";
import { resetUserData } from "./ServiceProviderUserDataSlice";

const initialState = {
  userData: [],
  subData: [],
};

const AllUsersSlice = createSlice({
  name: "AllUsersSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSubData: (state, action) => {
      state.subData = action.payload;
    },
    resetAllUserData: (state) => {
      state.userData = [];
      state.subData = [];
    },
  },
});
export const { setUserData, resetAllUserData, setSubData } =
  AllUsersSlice.actions;

export default AllUsersSlice.reducer;
