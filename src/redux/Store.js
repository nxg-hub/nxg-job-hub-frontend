import { configureStore } from "@reduxjs/toolkit";
import NearbyJobSlice from "./NearbyJobSlice";
import LoggedInUserSlice from "./LoggedInUserSlice";
import TalentApplicationSlice from "./TalentApplicationSlice";

export default configureStore({
  reducer: {
    NearbyJobSlice,
    LoggedInUserSlice,
    TalentApplicationSlice,
  },
});
