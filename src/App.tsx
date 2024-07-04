import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const App = () => {
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
};
export default App;
