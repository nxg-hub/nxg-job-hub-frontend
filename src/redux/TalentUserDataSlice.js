// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOST_URL } from "../utils/api/API_HOST";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const initialState = {
  talentData: [],
  LoggedIntalentData: [],
  loading: false,
  error: false,
  success: false,
};

export const fetchLoggedInTalent = createAsyncThunk(
  "talentUserData/fetchLoggedTalent",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await fetch(`${API_HOST_URL}/api/v1/auth/get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchTalentData = createAsyncThunk(
  "talentUserData/fetchTalentData",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await fetch(`${API_HOST_URL}/api/v1/tech-talent/get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
const TalentUserDataSlice = createSlice({
  name: "talentUserData",
  initialState,
  reducers: {
    resetTalentData: (state) => {
      state.talentData = [];
      state.LoggedIntalentData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInTalent.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLoggedInTalent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.talentData = action.payload;
        state.success = true;
      })
      .addCase(fetchLoggedInTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(fetchTalentData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTalentData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.LoggedIntalentData = action.payload;
        state.success = true;
      })
      .addCase(fetchTalentData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  },
});
export const { resetTalentData } = TalentUserDataSlice.actions;

export default TalentUserDataSlice.reducer;
