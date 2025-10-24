// Slice
import { createSlice } from "@reduxjs/toolkit";
import { resetUserData } from "./ServiceProviderUserDataSlice";

const initialState = {
  userData: [],
};

const AllUsersSlice = createSlice({
  name: "AllUsersSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    resetAllUserData: (state) => {
      state.userData = [];
    },
  },
});
export const { setUserData, resetAllUserData } = AllUsersSlice.actions;

export default AllUsersSlice.reducer;
