import { Dispatch, SetStateAction, useEffect } from "react";

import AddNewAppointment from "components/AddNewAppointment";
import FilteringMenu from "components/FilteringMenu";
import Header from "components/Header";
import SortMenu from "components/SortMenu";
import Tablet from "templates/Tablet";

import { tokenVerify } from "utils/services/usersService";

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
        <AddNewAppointment />
        <SortMenu />
        <FilteringMenu />
        <Tablet isLogin={isLogin} />
      </main>
    </>
  );
};

export default General;
