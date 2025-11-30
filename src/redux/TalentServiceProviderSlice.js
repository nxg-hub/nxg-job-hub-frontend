// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
const initialState = {
  allServicesProviders: [],
  loading: false,
  error: false,
  success: false,
};

export const fetchAllProviders = createAsyncThunk(
  "talentallproviders/fetchAllProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/service-providers/get-all-service-providers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const TalentServiceProviderSlice = createSlice({
  name: "talentServiceProvider",
  initialState,
  reducers: {
    resetTalentServiceData: (state) => {
      state.allServicesProviders = [];
      state.LoggedIntalentData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProviders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.allServicesProviders = action.payload;
        state.success = true;
      })
      .addCase(fetchAllProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  },
});
export const { resetTalentServiceData } = TalentServiceProviderSlice.actions;

export default TalentServiceProviderSlice.reducer;
