import ReactDOM from "react-dom/client";

//File
import App from "./App.tsx";
import Alert from "./components/Alert.tsx";

//Redux
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

//Global Css
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Alert />
  </Provider>
);
