import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

//File
import PrivateRoutes from "./utils/PrivateRoutes";

//UI
import {
  Login,
  Register,
  Home,
  Profile,
  CategoriesList,
  SelectedCategory,
  SelectedExercise,
} from "./features";

//Icon
import { Loader2 } from "lucide-react";

const App = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categoriesList" element={<CategoriesList />} />
            <Route path="/categoriesList/:id" element={<SelectedCategory />} />
            <Route
              path="/categoriesList/:id/:id"
              element={<SelectedExercise />}
            />
          </Route>
        </Routes>
      </Router>
    );
  }
};
export default App;
