import ReactDOM from "react-dom/client";

//File
import App from "./App.tsx";

//Global Css
import "./index.css";

//Redux
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
