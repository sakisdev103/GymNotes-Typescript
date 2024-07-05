import { Outlet, Navigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";

import { getUserData } from "@/state/Auth/AuthSlice";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  console.log(loggedInUser);

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
