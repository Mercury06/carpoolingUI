import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers";

// import { Constants } from "./components/utils/constants";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
