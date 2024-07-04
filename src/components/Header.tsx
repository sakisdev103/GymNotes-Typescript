import { Link } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";

//File
import { logoutUser } from "@/state/Auth/AuthSlice";

//UI
import { Button } from "./ui/button";

//Icons
import { Plus, User2 } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="container flex justify-between p-8">
      <Button variant={"ghost"} onClick={() => dispatch(logoutUser())}>
        <User2 />
      </Button>
      <Button asChild variant={"ghost"}>
        <Link to="/categoriesList">
          <Plus />
        </Link>
      </Button>
    </div>
  );
};
export default Header;
