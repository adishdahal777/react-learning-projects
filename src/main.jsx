import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navigator from "./Navigation/Navigator.jsx";
import { Provider } from "react-redux";
import { store } from "../app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Navigator />
    </Provider>
  </React.StrictMode>
);
