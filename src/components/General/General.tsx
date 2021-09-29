import { Dispatch, SetStateAction, useEffect } from "react";

import AddingNewAppointment from "../AddingNewAppointment/AddingNewAppointment";
import FilteringMenu from "../FilteringMenu/FilteringMenu";
import Header from "../Header/Header";
import SortMenu from "../SortMenu/SortMenu";
import Tablet from "../Tablet/Tablet";

import { tokenVerify } from "../../services/usersService";

import style from "./General.module.scss";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

interface IPropsGeneral {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const General = ({ isLogin, setIsLogin }: IPropsGeneral) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("user")) {
      tokenVerify(setIsLogin);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  useEffect(() => {
    !isLogin && dispatch(push("/login"));
  }, [isLogin, dispatch]);

  return (
    <>
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
