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
          <Route path="/GymNotes-Typescript/login" element={<Login />} />
          <Route path="/GymNotes-Typescript/register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/GymNotes-Typescript/" element={<Home />} />
            <Route
              path="/GymNotes-Typescript/categoriesList"
              element={<CategoriesList />}
            />
            <Route
              path="/GymNotes-Typescript/categoriesList/:id"
              element={<Exercises />}
            />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
