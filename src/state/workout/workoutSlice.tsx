import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//File
import db from "@/appwrite/database";
import { toast } from "react-toastify";
import { Models } from "appwrite";

const initialState: Models.DocumentList<Models.Document> = {
  total: 0,
  documents: [],
};

export const getWorkouts = createAsyncThunk("getWorkouts", async () => {
  try {
    return await db.workouts.list();
  } catch (error) {
    console.log(error);
  }
});

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

export const updateWorkout = createAsyncThunk(
  "updateWorkout",
  async ({
    id,
    payload,
  }: {
    id: string;
    payload: Omit<Document, keyof Models.Document>;
  }) => {
    try {
      const response = await db.workouts.update(id, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  "deleteWorkout",
  async (id: string) => {
    try {
      const response = await db.workouts.delete(id);
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
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.documents = action.payload.documents;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.documents = action.payload;
        toast.success("Successfully added workout!");
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.documents = action.payload;
        toast.success("Successfully updated workout!");
      })
      .addCase(deleteWorkout.fulfilled, () => {
        toast.success("Successfully deleted workout!");
      });
  },
});

export default workoutSlice.reducer;
