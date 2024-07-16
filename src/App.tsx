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
  Exercises,
} from "./features";

//React-Query
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categoriesList" element={<CategoriesList />} />
            <Route path="/categoriesList/:id" element={<Exercises />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
