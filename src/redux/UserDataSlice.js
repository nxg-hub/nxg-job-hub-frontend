// Slice
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: false,
  serviceData: [],
};

export const getUserData = createAsyncThunk(
  "UserDataSlice/userData",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_HOST_URL}/api/service-providers/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const UserDataSlice = createSlice({
  name: "UserDataSlice",
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      state.data = action.payload;
    },
    resetUserData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = false;
      state.serviceData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.serviceData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { storeUserData, resetUserData } = UserDataSlice.actions;

export default UserDataSlice.reducer;
