import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import Header from "components/Header";
import Button from "common/Button";
import Input from "common/Input";

import { registrationUser } from "utils/services/usersService";
import { passwordRegex } from "utils/registrationUtils";
import {
  errorLogin,
  errorPassword,
  errorRepeatPassword,
} from "./errorConstants";

import domain from "assets/icons/Domain.svg";

import style from "./Regstration.module.scss";

interface IPropsRegistration {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Registration = ({ isLogin, setIsLogin }: IPropsRegistration) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    errorLogin: "",
    errorPassword: "",
    errorRepeatPassword: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    isLogin && dispatch(push("/general"));
  }, [isLogin, dispatch]);

  const userRegistration = useCallback(
    (e) => {
      e.preventDefault();
      registrationUser(
        login,
        password,
        repeatPassword,
        setIsLogin,
        setError,
        error
      );
    },
    [login, password, repeatPassword, error, setIsLogin]
  );

  const checkLogin = useCallback(
    (value) => {
      setLogin(value);
      if (value.length < 6) {
        setError({ ...error, errorLogin });
      } else {
        setError({ ...error, errorLogin: "" });
      }
    },
    [setLogin, error]
  );

  const checkPassword = useCallback(
    (value) => {
      setPassword(value);
      if (!passwordRegex.test(value)) {
        setError({ ...error, errorPassword });
      } else {
        setError({ ...error, errorPassword: "" });
      }
    },
    [setPassword, error]
  );

  const checkRepeatPassword = useCallback(
    (value) => {
      setRepeatPassword(value);
      if (password !== value) {
        setError({ ...error, errorRepeatPassword });
      } else {
        setError({ ...error, errorRepeatPassword: "" });
      }
    },
    [setRepeatPassword, error, password]
  );

  const disabledBtn = useMemo(() => {
    return (
      !error.errorLogin && !error.errorPassword && !error.errorRepeatPassword
    );
  }, [error]);

  return (
    <>
      <Header title="Зарегистрироваться в системе" />
      <main className={style.registration_content}>
        <img
          src={domain}
          alt="Domain"
          className={style.registration_domain_image}
        />
        <div className={style.form_container}>
          <h2 className={style.form_label}>Регистрация</h2>
          <form
            className={style.registration_form}
            onSubmit={(e) => userRegistration(e)}
          >
            <Input
              type="text"
              label="Login:"
              placeholder="Login"
              value={login}
              setValue={checkLogin}
              id="login"
            />
            <div className={style.form_error_text}>
              {error.errorLogin && <p>{error.errorLogin}</p>}
            </div>
            <Input
              type="password"
              label="Password:"
              placeholder="Password"
              value={password}
              setValue={checkPassword}
              id="password"
            />
            <div className={style.form_error_text}>
              {error.errorPassword && (
                <p title={error.errorPassword}>{errorPassword}</p>
              )}
            </div>
            <Input
              type="password"
              label="Repeat password:"
              placeholder="Password"
              value={repeatPassword}
              setValue={checkRepeatPassword}
              id="repeatPassword"
            />
            <div className={style.form_error_text}>
              {error.errorRepeatPassword && <p>{error.errorRepeatPassword}</p>}
            </div>
            <div className={style.form_button}>
              <Button
                label="Зарегистрироваться"
                type="outline-small"
                disabled={disabledBtn}
              />
            </div>
          </form>
          <Link className={style.link_to_authorization} to="/login">
            Авторизоваться
          </Link>
        </div>
      </main>
    </>
  );
};

export default Registration;
