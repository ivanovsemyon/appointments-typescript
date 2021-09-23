import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../Header/Header";

import { loginUser } from "../../services/usersService";

import domain from "../../icons/Domain.svg";

import style from "./Login.module.scss";

interface IPropsLogin {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setIsLogin }: IPropsLogin) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (login && password) {
        loginUser(login, password, setIsLogin, history);
      }
    },
    [login, password, setIsLogin, history]
  );

  return (
    <>
      <Header title="Войти в систему" />
      <main className={style.login_content}>
        <img src={domain} alt="Domain" className={style.login_domain_image} />
        <div className={style.form_container}>
          <h2 className={style.form_label}>Войти в систему</h2>
          <form
            className={style.registration_form}
            onSubmit={(e) => onLogin(e)}
          >
            <label className={style.form_text}>Login:</label>
            <input
              type="text"
              className={style.form_input}
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <label className={style.form_text}>Password:</label>
            <input
              type="password"
              className={style.form_input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={style.form_button}>Войти</button>
            <Link className={style.link_to_login} to="/register">
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
