import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";
import workoutReducer from "./workout/workoutSlice";
import dateReducer from "./Date/dateSlice";
import categoriesReducer from "./Categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
    date: dateReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
