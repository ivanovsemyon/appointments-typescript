import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import baseRoute from "../utils/baseRoute";

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
  setError: (
    value:
      | ((prevState: {
          password: string;
          repeatPassword: string;
          login: string;
        }) => { password: string; repeatPassword: string; login: string })
      | { password: string; repeatPassword: string; login: string }
  ) => void,
  error: { password: string; repeatPassword: string; login: string }
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
          login: errorBackend.response.data.login,
        });
      } else if (errorBackend.response.data.password) {
        setError({
          ...error,
          password: errorBackend.response.data.password,
        });
      } else if (errorBackend.response.data.repeatPassword) {
        setError({
          ...error,
          repeatPassword: errorBackend.response.data.repeatPassword,
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
