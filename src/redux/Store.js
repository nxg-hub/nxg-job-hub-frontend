import { configureStore } from "@reduxjs/toolkit";
import LoggedInUserSlice from "./LoggedInUserSlice";
import TalentApplicationSlice from "./TalentApplicationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import LoggedInEmployerSlice from "./LoggedInEmployerSlice";
import UserDataReducer from "./ServiceProviderUserDataSlice";
import TalentReducer from "./TalentJobSlice";
import TalentUserReducer from "./TalentUserDataSlice";
import ServiceProviderJobReducer from "./ServiceProviderJobSlice";
import AllUserReducer from "./AllUsersSlice";
import TalentServiceProvider from "./TalentServiceProviderSlice";
import JobsReducer from "./JobSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["AllUserReducer", "UserDataReducer"],
};

const reducer = combineReducers({
  LoggedInUserSlice,
  TalentApplicationSlice,
  LoggedInEmployerSlice,
  UserDataReducer,
  ServiceProviderJobReducer,
  TalentReducer,
  TalentUserReducer,
  AllUserReducer,
  TalentServiceProvider,
  JobsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export default configureStore({
  reducer: persistedReducer,
});
