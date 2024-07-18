import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//File
import db from "@/appwrite/database";
import { Models } from "appwrite";

const initialState: Models.DocumentList<Models.Document> = {
  total: 0,
  documents: [],
};

export const getCategories = createAsyncThunk("getCategories", async () => {
  try {
    return await db.categories.list();
  } catch (error) {
    console.log(error);
  }
});

const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.documents = action.payload.documents;
    });
  },
});

export default categoriesSlice.reducer;
