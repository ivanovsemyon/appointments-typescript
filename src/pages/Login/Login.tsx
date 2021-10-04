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
import Button from "common/Button";
import Input from "common/Input";

import { loginUser } from "utils/services/usersService";

import domain from "assets/icons/Domain.svg";

import style from "./Login.module.scss";

interface IPropsLogin {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ isLogin, setIsLogin }: IPropsLogin) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (login && password) {
        loginUser(login, password, setIsLogin);
      }
    },
    [login, password, setIsLogin]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    isLogin && dispatch(push("/general"));
  }, [isLogin, dispatch]);

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
            <Input
              type="text"
              label="Login:"
              value={login}
              setValue={setLogin}
              id="login"
            />
            <div className={style.form_error_text}></div>
            <Input
              type="password"
              label="Password:"
              value={password}
              setValue={setPassword}
              id="password"
            />
            <div className={style.form_button}>
              <Button label="Войти" type="outline-small" />
            </div>
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
