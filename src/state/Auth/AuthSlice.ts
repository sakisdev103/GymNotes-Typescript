import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account, ID } from "@/appwrite/config";

type initialSliceState = {
  loggedInUser: any;
  loading: boolean;
};

type loginUserState = {
  email: string;
  password: string;
  username?: string;
};

const initialState: initialSliceState = {
  loggedInUser: null,
  loading: false,
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
  async ({ email, password, username }: loginUserState) => {
    try {
      await account.create(ID.unique(), email, password, username);
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
    checkUserStatus: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loggedInUser = null;
        state.loading = false;
      });
  },
});

export const { checkUserStatus } = authSlice.actions;

export default authSlice.reducer;
