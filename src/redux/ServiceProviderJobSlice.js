import { API_HOST_URL } from "@/utils/api/API_HOST";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks to fetch transactions
export const fetchAllJobs = createAsyncThunk(
  "serviceProviderjobs/fetchAllJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/job-postings/all?page=0&size=1&sort=string`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch riders");
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ServiceProviderJobSlice = createSlice({
  name: "serviceProviderjobs",
  initialState: {
    allJobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetAllJobs(state) {
      state.allJobs = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetAllJobs } = ServiceProviderJobSlice.actions;
export default ServiceProviderJobSlice.reducer;
