import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import Header from "components/Header";

import { registrationUser } from "utils/services/usersService";
import { passwordRegex } from "utils/registrationUtils";

import domain from "assets/icons/Domain.svg";

import style from "./Regstration.module.scss";
import Button from "../../common/Button";

interface IPropsRegistration {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Registration = ({ isLogin, setIsLogin }: IPropsRegistration) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });

  const validPassword = passwordRegex.test(password);

  const userRegistration = useCallback(
    (e) => {
      e.preventDefault();
      if (login.length < 6) {
        setError({
          ...error,
          login: "Длина логина должна быть не менее 6 символов",
        });
      } else if (!validPassword) {
        setError({
          ...error,
          password:
            "Длина пароля должна быть не меньше 6 символов, обязательно состоять из латинских символов и содержать число",
        });
      } else if (password !== repeatPassword) {
        setError({
          ...error,
          repeatPassword: "Пароли не совпадают",
        });
      } else {
        registrationUser(
          login,
          password,
          repeatPassword,
          setIsLogin,
          setError,
          error
        );
      }
    },
    [login, password, repeatPassword, error, setIsLogin, validPassword]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    isLogin && dispatch(push("/general"));
  }, [isLogin, dispatch]);

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
            <label className={style.form_text}>Login:</label>
            <input
              type="text"
              placeholder="Login"
              className={style.form_input}
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setError({ ...error, login: "" });
              }}
            />
            <div className={style.form_error_text}>
              {error.login && <p>{error.login}</p>}
            </div>
            <label className={style.form_text}>Password:</label>
            <input
              type="password"
              placeholder="Password"
              className={style.form_input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, password: "" });
              }}
            />
            <div className={style.form_error_text}>
              {error.password && <p title={error.password}>{error.password}</p>}
            </div>
            <label className={style.form_text}>Repeat password:</label>
            <input
              type="password"
              placeholder="Password"
              className={style.form_input}
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setError({ ...error, repeatPassword: "" });
              }}
            />
            <div className={style.form_error_text}>
              {error.repeatPassword && <p>{error.repeatPassword}</p>}
            </div>
            <div className={style.form_button}>
              <Button
                label="Зарегистрироваться"
                type="outline-small"
                disabled={
                  !(!error.login && !error.password && !error.repeatPassword)
                }
              />
            </div>
            {/*/!*<button*!/*/}
            {/*/!*  className={style.form_button}*!/*/}
            {/*  // disabled={*/}
            {/*  //   !(!error.login && !error.password && !error.repeatPassword)*/}
            {/*  // }*/}
            {/*/!*>*!/*/}
            {/*/!*  Зарегистрироваться*!/*/}
            {/*/!*</button>*!/*/}
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
