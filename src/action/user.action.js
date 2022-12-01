import { addUser, removeUser } from "../reducer/user.reducer";
import { resetImageStore } from "../reducer/image.reducer";
import * as api from "../api";
import toast from "react-hot-toast";
import React from "react";

export const signInAction = (formData) => async (dispatch) => {
  toast.promise(
    (async () => {
      const { data } = await api.signIn(formData);
      await window.electronAPI.setUser(data);
      dispatch(addUser(data));
    })(),
    {
      loading: "Login...",
      success: <b>Login successfully!</b>,
      error: (error) =>
        error && error?.message ? (
          <b>{error.message}</b>
        ) : (
          <b>Login failed. Try again!</b>
        ),
    }
  );
};

export const signUpAction = (formData) => async (dispatch) => {
  toast.promise(
    (async () => {
      const { data } = await api.signUp(formData);
      await window.electronAPI.setUser(data);
      dispatch(addUser(data));
    })(),
    {
      loading: "Registering...",
      success: <b>Registered successfully!</b>,
      error: (error) =>
        error && error?.message ? (
          <b>{error.message}</b>
        ) : (
          <b>Registration failed. Try again!</b>
        ),
    }
  );
};

export const signOutAction = () => async (dispatch) => {
  toast.promise(
    (async () => {
      await window.electronAPI.setUser(null);
      dispatch(removeUser());
      dispatch(resetImageStore());
    })(),
    {
      loading: "Signing out...",
      success: <b>Signed out successfully!</b>,
      error: (error) =>
        error && error?.message ? (
          <b>{error.message}</b>
        ) : (
          <b>Signing out has failed. Try again!</b>
        ),
    }
  );
};
