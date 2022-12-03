import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../component/page/AuthPage/AuthPage";
import HomePage from "../component/page/HomePage/HomePage";
import ProtectedRoute from "../component/element/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUser } from "../reducer/user.reducer";
import LoadingIndicator from "../component/element/LoadingIndicator";
import * as api from "../api";

export default function AppRouter() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) window.electronAPI.hideSideBar();
  }, [user]);

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const userData = await window.electronAPI.getUser();
        if (userData?.token && userData?.email) {
          await api.ping(userData.token);
          dispatch(addUser(userData));
        }
      } finally {
        setIsLoading(false);
      }
    };
    getAuthData();
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
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
  );
}
