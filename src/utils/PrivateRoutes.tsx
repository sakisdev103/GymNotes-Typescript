import { Outlet, Navigate } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const PrivateRoutes = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  console.log(loggedInUser);

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
