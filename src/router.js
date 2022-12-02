import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./component/page/AuthPage/AuthPage";
import HomePage from "./component/page/HomePage/HomePage";
import ProtectedRoute from "./component/element/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUser } from "./reducer/user.reducer";
import LoadingScreen from "./component/element/LoadingScreen/LoadingScreen";
import * as api from "./api";
import { selectImage } from "./reducer/image.reducer";
import { fetchImagesAction } from "./action/image.action";

export default function Router() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const images = useSelector(selectImage);
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

  useEffect(() => {
    window.electronAPI.hideSideBar();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user) window.electronAPI.hideSideBar();
    }
  }, [isLoading, user]);

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
