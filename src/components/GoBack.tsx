import { useNavigate } from "react-router-dom";
//UI
import { Button } from "./ui/button";
//Icon
import { ArrowLeft } from "lucide-react";
const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div className="container px-8 my-8">
      <Button variant={"ghost"} onClick={() => navigate(-1)}>
        <ArrowLeft />
      </Button>
    </div>
  );
};
export default GoBack;
