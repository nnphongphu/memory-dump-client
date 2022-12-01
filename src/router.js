import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./component/page/AuthPage/AuthPage";
import HomePage from "./component/page/HomePage/HomePage";
import ProtectedRoute from "./component/element/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { addUser } from "./reducer/user.reducer";
import LoadingScreen from "./component/element/LoadingScreen/LoadingScreen";
import * as api from "./api";

export default function Router() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const userData = await window.electronAPI.getUser();
        if (userData?.token && userData?.email) {
          await api.ping(userData.token);
          dispatch(addUser(userData));
          api.setRequestHeader(userData.token);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getAuthData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/auth" element={<AuthPage />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}
