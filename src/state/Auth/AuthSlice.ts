import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account, ID } from "@/appwrite/config";
import { toast } from "react-toastify";

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

export const getUserData = async () => {
  try {
    return account.get();
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: loginUserState) => {
    try {
      await account.createEmailPasswordSession(email, password);
      let accountDetails = await account.get();
      return accountDetails;
    } catch (error) {
      return (error as any).message;
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
      return (error as any).message;
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
        toast("Logging in...");
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          toast.dismiss();
          toast.error(action.payload);
        } else {
          state.loggedInUser = action.payload;
        }
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        toast("Creating user...");
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          toast.dismiss();
          toast.error(action.payload);
        } else {
          state.loggedInUser = action.payload;
        }
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        toast("Logging out...");
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
