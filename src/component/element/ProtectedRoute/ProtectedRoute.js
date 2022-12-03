import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../reducer/user.reducer";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}
