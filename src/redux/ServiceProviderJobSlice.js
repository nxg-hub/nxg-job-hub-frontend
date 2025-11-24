import { API_HOST_URL } from "@/utils/api/API_HOST";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks to fetch transactions
export const fetchAllJobs = createAsyncThunk(
  "serviceProviderjobs/fetchAllJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_HOST_URL}/api/job-postings/all`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch riders");
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSavedJobs = createAsyncThunk(
  "serviceProviderSavedjobs/fetchSavedJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/service-providers/my-jobs?page=0&size=100&sort=string`,
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

      return data.content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProviderRecentJobs = createAsyncThunk(
  "TalentJobs/fetchTalentRecentJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await fetchJSON(
        `${API_HOST_URL}/api/job-postings/recent-job-postings?page=0&size=100`,
        token
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProviderNearByJobs = createAsyncThunk(
  "TalentJobs/fetchTalentNearByJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_HOST_URL}/api/job-postings/recommend-nearby-jobs`,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMyJobs = createAsyncThunk(
  "serviceProviderMyjobs/fetchMyJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/service-providers/my-application?page=0&size=100&sort=string`,
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

      return data.content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const ServiceProviderJobSlice = createSlice({
  name: "serviceProviderjobs",
  initialState: {
    allJobs: [],
    savedJobs: [],
    myJobs: [],
    loading: false,
    savedLoading: false,
    myLoading: false,
    savedError: false,
    myError: false,
    error: null,
    recentJobs: [],
    nearByJobs: [],
    nearError: null,
  },
  reducers: {
    resetAllJobs(state) {
      state.allJobs = [];
      state.savedJobs = [];
      state.myJobs = [];
      state.recentJobs = [];
      state.nearByJobs = [];
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
      })
      .addCase(fetchSavedJobs.pending, (state) => {
        state.savedLoading = true;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.savedJobs = action.payload;
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.savedLoading = false;
        state.savedError = action.payload;
      })
      .addCase(fetchMyJobs.pending, (state) => {
        state.myLoading = true;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.myLoading = false;
        state.myJobs = action.payload;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
        state.myLoading = false;
        state.myError = action.payload;
      })
      // RECENT JOBS
      .addCase(fetchProviderRecentJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderRecentJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recentJobs = action.payload;
      })
      .addCase(fetchProviderRecentJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // NEARBY JOBS
      .addCase(fetchProviderNearByJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderNearByJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.nearError = null;
        state.nearByJobs = action.payload;
      })
      .addCase(fetchProviderNearByJobs.rejected, (state, action) => {
        state.loading = false;
        state.nearError = action.payload;
      });
  },
});
export const { resetAllJobs } = ServiceProviderJobSlice.actions;
export default ServiceProviderJobSlice.reducer;
