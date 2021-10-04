import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import baseRoute from "../baseRoute";

export const loginUser = (
  login: string,
  password: string,
  setIsLogin: Dispatch<SetStateAction<boolean>>
) => {
  axios
    .post(baseRoute("loginUser"), {
      login: login.trim(),
      password: password.trim(),
    })
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", login);
      setIsLogin(true);
    });
};

export const registrationUser = (
  login: string,
  password: string,
  repeatPassword: string,
  setIsLogin: Dispatch<SetStateAction<boolean>>,
  setError: (value: {
    errorLogin: string;
    errorPassword: string;
    errorRepeatPassword: string;
  }) => void,
  error: {
    errorLogin: string;
    errorPassword: string;
    errorRepeatPassword: string;
  }
) => {
  axios
    .post(baseRoute("registrationUser"), {
      login: login.trim(),
      password: password.trim(),
      repeatPassword: repeatPassword.trim(),
    })
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", login);
      setIsLogin(true);
    })
    .catch((errorBackend) => {
      if (errorBackend.response.data.login) {
        setError({
          ...error,
          errorLogin: errorBackend.response.data.login,
        });
      } else if (errorBackend.response.data.password) {
        setError({
          ...error,
          errorPassword: errorBackend.response.data.password,
        });
      } else if (errorBackend.response.data.repeatPassword) {
        setError({
          ...error,
          errorRepeatPassword: errorBackend.response.data.repeatPassword,
        });
      } else {
        console.log("Введены некорректные данные");
      }
    });
};

export const tokenVerify = (setIsLogin: Dispatch<SetStateAction<boolean>>) => {
  axios
    .post(baseRoute("verify"), {
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
    })
    .then((result) => {
      setIsLogin(result.data.isLogin);
    });
};
