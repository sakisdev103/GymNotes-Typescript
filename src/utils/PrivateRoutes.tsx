import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

//File
import { getUserData } from "@/state/Auth/AuthSlice";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";

const PrivateRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  return loggedInUser ? (
    <Outlet />
  ) : (
    <Navigate to="/GymNotes-Typescript/login" />
  );
};
export default PrivateRoutes;
