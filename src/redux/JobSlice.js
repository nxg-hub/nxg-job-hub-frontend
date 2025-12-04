import { API_HOST_URL } from "@/utils/api/API_HOST";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ===========================================
// FETCH NEARBY JOBS
// ===========================================
export const fetchNearbyJobs = createAsyncThunk(
  "nearByJobs/fetchNearbyJobs",
  async ({ token, userCity, jobType, jobLocation }, { rejectWithValue }) => {
    try {
      let url = `${API_HOST_URL}/api/job-postings/search-nearby-jobs?userCity=${encodeURIComponent(
        userCity
      )}`;

      if (jobType) url += `&jobType=${encodeURIComponent(jobType)}`;
      if (jobLocation) url += `&jobLocation=${encodeURIComponent(jobLocation)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch nearby jobs");

      const data = await response.json();
      return { data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllJobs = createAsyncThunk(
  "alljobs/fetchAllJobs",
  async (
    { token, page = 0, size = 5, city, search, jobType },
    { rejectWithValue }
  ) => {
    try {
      let url = `${API_HOST_URL}/api/job-postings/all?page=${page}&size=${size}`;
      if (city) url += `&city=${city}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (jobType) url += `&jobType=${encodeURIComponent(jobType)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      return { data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ===========================================
// NEARBY JOBS SLICE
// ===========================================
const JobsSlice = createSlice({
  name: "Jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    allJobs: [],
    page: 0,
  },
  reducers: {
    clearNearbyJobs: (state) => {
      state.jobs = [];
      state.loading = false;
      state.error = null;
      state.page = 0;
    },
    setPage: (action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
      })
      .addCase(fetchNearbyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;

        // Append to existing list instead of replacing
        if (action.payload.page === 0) {
          state.allJobs = action.payload.data;
        } else {
          state.allJobs = [...state.allJobs, ...action.payload.data];
        }
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNearbyJobs, setPage } = JobsSlice.actions;

export default JobsSlice.reducer;
