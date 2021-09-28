import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spin } from "antd";

import TabletItem from "../TabletItem/TabletItem";

import { getAllAppointments } from "../../services/appointmentsService";
import { IAppointment, IState } from "../../interfaces/appointmentInterfaces";

import style from "./Tablet.module.scss";

interface IPropsTablet {
  isLogin: boolean;
}

const Tablet = ({ isLogin }: IPropsTablet) => {
  const dispatch = useDispatch();

  const doctors = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.doctors
  );
  const isLoading = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.isLoading
  );
  const appointments = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.appointmentsState
  );

  useEffect(() => {
    if (
      isLogin &&
      !!localStorage.getItem("token") &&
      !!localStorage.getItem("user")
    ) {
      dispatch(getAllAppointments());
    }
  }, [isLogin, dispatch]);

  return (
    <div className={style.tablet}>
      <div className={style.tablet_header}>
        <h3 className={`${style.tablet_header_title} ${style.name}`}>Имя</h3>
        <h3 className={`${style.tablet_header_title} ${style.doctor}`}>Врач</h3>
        <h3 className={`${style.tablet_header_title} ${style.date}`}>Дата</h3>
        <h3 className={`${style.tablet_header_title} ${style.complaint}`}>
          Жалобы:
        </h3>
      </div>
      {isLoading ? (
        <Spin className={style.spin} size={"large"} />
      ) : (
        <div className={style.tablet_main}>
          {!!appointments?.length &&
            appointments.map((item: IAppointment) => (
              <TabletItem key={item._id} item={item} doctors={doctors} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Tablet;
