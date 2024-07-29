import { Link } from "react-router-dom";

//File
import { logoutUser } from "@/state/Auth/AuthSlice";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";

//UI
import { Button } from "./ui/button";

//Icons
import { Plus, LogOut } from "lucide-react";

const Header = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <div className="container flex justify-between items-center p-8">
        <Button variant={"ghost"} onClick={() => dispatch(logoutUser())}>
          <LogOut />
        </Button>
        <h3>{loggedInUser.name}</h3>
        <Button asChild variant={"ghost"}>
          <Link to="/GymNotes-Typescript/categoriesList">
            <Plus />
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Header;
