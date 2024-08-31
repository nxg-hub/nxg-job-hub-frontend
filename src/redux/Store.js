import { configureStore } from "@reduxjs/toolkit";
import NearbyJobSlice from "./NearbyJobSlice";
import LoggedInUserSlice from "./LoggedInUserSlice";
import TalentApplicationSlice from "./TalentApplicationSlice";
import FilterSlice from "./FilterSlice";
import JobListingApplicationSlice from "./JobListingApplicationSlice";
import SearchJobSlice from "./SearchJobSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { version } from "react";
import InterviewSlice from "./InterviewSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  NearbyJobSlice,
  LoggedInUserSlice,
  TalentApplicationSlice,
  FilterSlice,
  JobListingApplicationSlice,
  SearchJobSlice,
  InterviewSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export default configureStore({
  reducer: persistedReducer,
});
