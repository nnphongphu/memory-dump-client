import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import background from "../../../assets/background.jpg";
import { selectUser } from "../../../reducer/user.reducer";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const user = useSelector(selectUser);

  if (user) return <Navigate to="/" replace />;

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {tab == "login" ? (
        <LoginForm handleChangeTab={() => setTab("register")} />
      ) : (
        <RegisterForm handleChangeTab={() => setTab("login")} />
      )}
    </div>
  );
}
