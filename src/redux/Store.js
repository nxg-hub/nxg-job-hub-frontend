import { configureStore } from "@reduxjs/toolkit";
import NearbyJobSlice from "./NearbyJobSlice";
import LoggedInUserSlice from "./LoggedInUserSlice";

export default configureStore({
  reducer: {
    NearbyJobSlice,
    LoggedInUserSlice,
  },
});
