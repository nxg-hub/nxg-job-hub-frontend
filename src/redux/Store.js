import { configureStore } from "@reduxjs/toolkit";
import NearbyJobSlice from "./NearbyJobSlice";
import LoggedInUserSlice from "./LoggedInUserSlice";
import TalentApplicationSlice from "./TalentApplicationSlice";
import FilterSlice from "./FilterSlice";
import JobListingApplicationSlice from "./JobListingApplicationSlice";
import SearchJobSlice from "./SearchJobSlice";

export default configureStore({
  reducer: {
    NearbyJobSlice,
    LoggedInUserSlice,
    TalentApplicationSlice,
    FilterSlice,
    JobListingApplicationSlice,
    SearchJobSlice,
  },
});
