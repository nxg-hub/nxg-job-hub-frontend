import { API_HOST_URL } from "@/utils/api/API_HOST";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ======================================
   FETCH NEARBY JOBS (INFINITE SCROLL)
====================================== */
export const fetchNearbyJobs = createAsyncThunk(
  "jobs/fetchNearbyJobs",
  async (
    { token, userCity, jobType, jobLocation, page = 0, size = 20 },
    { rejectWithValue }
  ) => {
    try {
      let url = `${API_HOST_URL}/api/job-postings/search-nearby-jobs?userCity=${encodeURIComponent(
        userCity
      )}&page=${page}&size=${size}`;

      if (jobType) url += `&jobType=${encodeURIComponent(jobType)}`;
      if (jobLocation) url += `&jobLocation=${encodeURIComponent(jobLocation)}`;

      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch nearby jobs");

      const data = await res.json();
      return { data, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ======================================
   FETCH ALL JOBS (INFINITE SCROLL)
====================================== */
export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAllJobs",
  async (
    { token, page = 0, size = 20, city, search, jobType },
    { rejectWithValue }
  ) => {
    try {
      let url = `${API_HOST_URL}/api/job-postings/all?page=${page}&size=${size}`;

      if (city) url += `&city=${encodeURIComponent(city)}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (jobType) url += `&jobType=${encodeURIComponent(jobType)}`;

      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      return { data, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ======================================
   SLICE
====================================== */
const JobsSlice = createSlice({
  name: "jobs",
  initialState: {
    nearbyJobs: [],
    allJobs: [],

    nearbyPage: 0,
    allJobsPage: 0,

    nearbyHasMore: true,
    allJobsHasMore: true,

    loading: false,
    error: null,
  },
  reducers: {
    clearNearbyJobs: (state) => {
      state.nearbyJobs = [];
      state.nearbyPage = 0;
      state.nearbyHasMore = true;
    },
    resetAllJobs: (state) => {
      state.allJobs = [];
      state.allJobsPage = 0;
      state.allJobsHasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder

      /* -------- NEARBY JOBS -------- */
      .addCase(fetchNearbyJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNearbyJobs.fulfilled, (state, action) => {
        state.loading = false;

        const { content, last } = action.payload.data;

        if (action.payload.page === 0) {
          state.nearbyJobs = content;
        } else {
          state.nearbyJobs.push(...content);
        }

        state.nearbyPage = action.payload.page;
        state.nearbyHasMore = !last;
      })
      .addCase(fetchNearbyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- ALL JOBS -------- */
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;

        const { content, last } = action.payload.data;

        if (action.payload.page === 0) {
          state.allJobs = content;
        } else {
          state.allJobs.push(...content);
        }

        state.allJobsPage = action.payload.page;
        state.allJobsHasMore = !last;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNearbyJobs, resetAllJobs } = JobsSlice.actions;

export default JobsSlice.reducer;
