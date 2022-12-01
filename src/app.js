import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Router from "./router";

export default function App() {
  return (
    <Provider store={store}>
      <Toaster position="bottom-center" />
      <Router />
    </Provider>
  );
}
