import { API_HOST_URL } from "@/utils/api/API_HOST";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to fetch safely
const fetchJSON = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const fetchAllTalentJobs = createAsyncThunk(
  "TalentJobs/fetchAllTalentJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await fetchJSON(
        `${API_HOST_URL}/api/job-postings/all?page=0&size=100000`,
        token
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTalentSavedJobs = createAsyncThunk(
  "TalentJobs/fetchTalentSavedJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const data = await fetchJSON(
        `${API_HOST_URL}/api/v1/tech-talent/my-jobs?page=0&size=1000&sort=string`,
        token
      );
      return data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMyTalentJobs = createAsyncThunk(
  "TalentJobs/fetchMyTalentJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const data = await fetchJSON(
        `${API_HOST_URL}/api/v1/tech-talent/my-applications?page=0&size=100000000&sort=string`,
        token
      );
      return data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTalentRecentJobs = createAsyncThunk(
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

export const fetchTalentNearByJobs = createAsyncThunk(
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

const TalentJobSlice = createSlice({
  name: "TalentJobs",
  initialState: {
    allJobs: [],
    savedJobs: [],
    myJobs: [],
    recentJobs: [],
    nearByJobs: [],
    loading: false,
    myLoading: false,
    savedLoading: false,
    error: null,
    myError: null,
    savedError: null,
    nearError: null,
  },
  reducers: {
    resetTalentJobs: (state) => {
      state.allJobs = [];
      state.savedJobs = [];
      state.error = null;
      state.savedError = null;
      state.myError = null;
      state.nearError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ALL JOBS
      .addCase(fetchAllTalentJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTalentJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allJobs = action.payload;
      })
      .addCase(fetchAllTalentJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVED JOBS
      .addCase(fetchTalentSavedJobs.pending, (state) => {
        state.savedLoading = true;
      })
      .addCase(fetchTalentSavedJobs.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.savedError = null;
        state.savedJobs = action.payload;
      })
      .addCase(fetchTalentSavedJobs.rejected, (state, action) => {
        state.savedLoading = false;
        state.savedError = action.payload;
      })

      // MY JOBS
      .addCase(fetchMyTalentJobs.pending, (state) => {
        state.myLoading = true;
      })
      .addCase(fetchMyTalentJobs.fulfilled, (state, action) => {
        state.myLoading = false;
        state.myError = null;
        state.myJobs = action.payload;
      })
      .addCase(fetchMyTalentJobs.rejected, (state, action) => {
        state.myLoading = false;
        state.myError = action.payload;
      })

      // RECENT JOBS
      .addCase(fetchTalentRecentJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTalentRecentJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recentJobs = action.payload;
      })
      .addCase(fetchTalentRecentJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // NEARBY JOBS
      .addCase(fetchTalentNearByJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTalentNearByJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.nearError = null;
        state.nearByJobs = action.payload;
      })
      .addCase(fetchTalentNearByJobs.rejected, (state, action) => {
        state.loading = false;
        state.nearError = action.payload;
      });
  },
});

export const { resetTalentJobs } = TalentJobSlice.actions;
export default TalentJobSlice.reducer;
