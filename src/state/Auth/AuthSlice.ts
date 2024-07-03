import { createSlice } from "@reduxjs/toolkit";

type authState = {
  loading: boolean;
  user: null;
};

const initialState: authState = {
  loading: true,
  user: null,
};

const dataSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
});

export default dataSlice.reducer;
