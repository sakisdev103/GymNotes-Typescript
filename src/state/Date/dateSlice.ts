import { createSlice } from "@reduxjs/toolkit";

type state = {
  date: Date;
};

const initialState: state = { date: new Date() };

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    updateDates: (state, action) => {
      state.date = action.payload;
      console.log(action.payload);
    },
  },
});

export const { updateDates } = datesSlice.actions;

export default datesSlice.reducer;
