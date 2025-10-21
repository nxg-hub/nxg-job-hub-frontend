import { API_HOST_URL } from "@/utils/api/API_HOST";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks to fetch transactions
export const fetchAllTalentJobs = createAsyncThunk(
  "TalentJobS/fetchAllTalentJobs",
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

export const fetchTalentSavedJobs = createAsyncThunk(
  "TalentJobs/fetchTalentSavedJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/v1/tech-talent/my-jobs?page=0&size=100&sort=string`,
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

export const fetchMyTalentJobs = createAsyncThunk(
  "serviceProviderMyjobs/fetchMyJobs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/v1/tech-talent/my-applications?page=0&size=100&sort=string`,
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

const TalentJobSlice = createSlice({
  name: "TalentJobS",
  initialState: {
    allJobs: [],
    savedJobs: [],
    myJobs: [],
    loading: false,
    myLoading: false,
    savedLoading: false,
    savedError: false,
    error: null,
    myError: false,
  },
  reducers: {
    resetTalentJobs(state) {
      state.allJobs = null;
      state.savedJobs = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTalentJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTalentJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
      })
      .addCase(fetchAllTalentJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTalentSavedJobs.pending, (state) => {
        state.savedLoading = true;
      })
      .addCase(fetchTalentSavedJobs.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.savedJobs = action.payload;
      })
      .addCase(fetchTalentSavedJobs.rejected, (state, action) => {
        state.savedLoading = false;
        state.savedError = action.payload;
      })
      .addCase(fetchMyTalentJobs.pending, (state) => {
        state.myLoading = true;
      })
      .addCase(fetchMyTalentJobs.fulfilled, (state, action) => {
        state.myLoading = false;
        state.myJobs = action.payload;
      })
      .addCase(fetchMyTalentJobs.rejected, (state, action) => {
        state.myLoading = false;
        state.myError = action.payload;
      });
  },
});
export const { resetTalentJobs } = TalentJobSlice.actions;
export default TalentJobSlice.reducer;
