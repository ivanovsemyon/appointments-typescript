import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import Button from "../Button/Button";

import logo from "../../icons/Logo.svg";

import style from "./Header.module.scss";

interface IPropsHeader {
  title?: string;
  isRenderLogout?: boolean;
}

const Header = ({ title, isRenderLogout }: IPropsHeader) => {
  const history = useHistory();

  const onLogout = useCallback(() => {
    history.push("/login");
    localStorage.clear();
  }, [history]);

  return (
    <header className={style.main_header}>
      <img src={logo} alt="Logo healing" className={style.header_logo} />
      <h1 className={style.header_label}>{title}</h1>
      {isRenderLogout && (
        <Button
          className={style.header_logout_button}
          label="Выход"
          height="45px"
          fontSize="24px"
          margin="0 40px 0 0"
          onClick={onLogout}
        />
      )}
    </header>
  );
};

export default Header;
