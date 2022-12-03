import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signInAction, signUpAction } from "../../../action/user.action";
import { selectUser } from "../../../reducer/user.reducer";
import AuthForm from "./AuthForm";
import { Container } from "./CustomStyles";
import background from "../../../assets/background.jpg";

const TAB = {
  LOGIN: "login",
  REGISTER: "register",
};

export default function AuthPage() {
  const [tab, setTab] = useState(TAB.LOGIN);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  if (user) return <Navigate to="/" replace />;

  return (
    <Container style={{ backgroundImage: `url(${background})` }}>
      {tab == TAB.LOGIN ? (
        <AuthForm
          handleChangeTab={() => setTab(TAB.REGISTER)}
          tagline="Login to start dumping memory"
          submitButtonText="Login"
          changeTabButtonText="Don't have an account? Register now"
          handleSubmit={(formData) => dispatch(signInAction(formData))}
        />
      ) : (
        <AuthForm
          handleChangeTab={() => setTab(TAB.LOGIN)}
          tagline="Register your new memory dump account!"
          submitButtonText="Register"
          changeTabButtonText="Already have an account? Login now"
          handleSubmit={(formData) => dispatch(signUpAction(formData))}
        />
      )}
    </Container>
  );
}
