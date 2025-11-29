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
import InterviewSlice from "./InterviewSlice";
import LoggedInEmployerSlice from "./LoggedInEmployerSlice";
import UserDataReducer from "./ServiceProviderUserDataSlice";
import TalentReducer from "./TalentJobSlice";
import TalentUserReducer from "./TalentUserDataSlice";
import ServiceProviderJobReducer from "./ServiceProviderJobSlice";
import AllUserReducer from "./AllUsersSlice";
import TalentServiceProvider from "./TalentServiceProviderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["AllUserReducer", "UserDataReducer"],
};

const reducer = combineReducers({
  NearbyJobSlice,
  LoggedInUserSlice,
  TalentApplicationSlice,
  FilterSlice,
  JobListingApplicationSlice,
  SearchJobSlice,
  InterviewSlice,
  LoggedInEmployerSlice,
  UserDataReducer,
  ServiceProviderJobReducer,
  TalentReducer,
  TalentUserReducer,
  AllUserReducer,
  TalentServiceProvider,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export default configureStore({
  reducer: persistedReducer,
});
