import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//File
import db from "@/appwrite/database";

const initialState = {
  workouts: await db.workouts.list(),
};

const authSlice = createSlice({
  name: "Workouts",
  initialState,
  reducers: {},
});

// export const { checkUserStatus } = authSlice.actions;

export default authSlice.reducer;
