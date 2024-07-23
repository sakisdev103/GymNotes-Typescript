import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//File
import PrivateRoutes from "./utils/PrivateRoutes";

//React-Query
import { QueryClient, QueryClientProvider } from "react-query";

//UI
import { Login, Register, Home, CategoriesList, Exercises } from "./features";

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
            <Route path="/categoriesList" element={<CategoriesList />} />
            <Route path="/categoriesList/:id" element={<Exercises />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
