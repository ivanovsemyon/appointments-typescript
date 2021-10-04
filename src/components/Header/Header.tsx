import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import Button from "common/Button";

import logo from "assets/icons/Logo.svg";

import style from "./Header.module.scss";

interface propsHeader {
  title?: string;
  isRenderLogout?: boolean;
}

const Header = ({ title, isRenderLogout }: propsHeader) => {
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
        <div className={style.header_logout_button}>
          <Button label="Выход" type="outline" onClick={onLogout} />
        </div>
      )}
    </header>
  );
};

export default Header;
