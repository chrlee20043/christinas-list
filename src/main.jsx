import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./Redux/apiSlice";
import authReducer from "./Redux/authSlice";
import App from "./App.jsx";
import "./index.css";

const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    authenticate: authReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
  // devTools: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
