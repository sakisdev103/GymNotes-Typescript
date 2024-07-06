import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

//File
import db from "@/appwrite/database";
import { toast } from "react-toastify";
import { Models } from "appwrite";

const initialState = {
  loading: false,
  workouts: await db.workouts.list(),
};

export const create = createAsyncThunk(
  "create",
  async (payload: Omit<Document, keyof Models.Document>) => {
    try {
      const response = await db.workouts.create(payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const workoutSlice = createSlice({
  name: "Workouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.loading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.loading = false;
        toast.success("Successfully added workout!");
        // setTimeout(() => {
        //   location.replace("/");
        // }, 2000);
      });
  },
});

export default workoutSlice.reducer;
