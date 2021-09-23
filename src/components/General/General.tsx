import { Dispatch, SetStateAction, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { tokenVerify } from "../../services/usersService";
import AddingNewAppointment from "../AddingNewAppointment/AddingNewAppointment";
import FilteringMenu from "../FilteringMenu/FilteringMenu";
import Header from "../Header/Header";
import SortMenu from "../SortMenu/SortMenu";
import Tablet from "../Tablet/Tablet";

import style from "./General.module.scss";

interface IPropsGeneral {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const General = ({ isLogin, setIsLogin }: IPropsGeneral) => {
  useEffect(() => {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("user")) {
      tokenVerify(setIsLogin);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  return (
    <>
      {!isLogin && <Redirect to="/login" />}
      <Header title="Приемы" isRenderLogout />
      <main className={style.general_appointments}>
        <AddingNewAppointment />
        <SortMenu />
        <FilteringMenu />
        <Tablet isLogin={isLogin} />
      </main>
    </>
  );
};

export default General;
