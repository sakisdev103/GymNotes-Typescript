import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account, ID } from "@/appwrite/config";

type loginUserState = {
  email: string;
  password: string;
};

const initialState = {
  loggedInUser: null,
  email: "",
  password: "",
  name: "",
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: loginUserState) => {
    try {
      await account.createEmailPasswordSession(email, password);
      let accountDetails = await account.get();
      return accountDetails;
    } catch (error) {
      console.log(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, password }: loginUserState) => {
    try {
      await account.create(ID.unique(), email, password);
      await account.createEmailPasswordSession(email, password);
      let accountDetails = await account.get();
      return accountDetails;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    let response = await account.deleteSession("current");
    return response;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logoutUser: () => {},
    registerUser: () => {},
    checkUserStatus: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {})
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loggedInUser = null;
      });
  },
});

export const { checkUserStatus } = authSlice.actions;

export default authSlice.reducer;
