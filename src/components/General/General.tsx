import {Dispatch, SetStateAction, useEffect} from "react";

import { Redirect } from "react-router-dom";

import Header from "../Header/Header";
import AddingNewAppointment from "../AddingNewAppointment/AddingNewAppointment";
import SortMenu from "../SortMenu/SortMenu";
import FilteringMenu from "../FilteringMenu/FilteringMenu";
import Tablet from "../Tablet/Tablet";

import { tokenVerify } from "../../services/usersService";

import style from "./General.module.scss";

interface IPropsGeneral {
  isLogin: boolean,
  setIsLogin: Dispatch<SetStateAction<boolean>>
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
