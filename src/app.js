import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./router/app.router";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import PreviewRouter from "./router/preview.router";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path="*"
          element={
            <Provider store={store}>
              <Toaster position="bottom-center" />
              <AppRouter />
            </Provider>
          }
        />
        <Route exact path="/preview/*" element={<PreviewRouter />} />
      </Routes>
    </HashRouter>
  );
}
