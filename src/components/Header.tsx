import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus, User2 } from "lucide-react";
const Header = () => {
  return (
    <div className="container flex justify-between p-8">
      <Button asChild variant={"ghost"}>
        <Link to="/profile">
          <User2 />
        </Link>
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
