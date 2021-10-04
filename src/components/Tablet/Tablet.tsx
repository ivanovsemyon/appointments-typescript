import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spin } from "antd";

import TabletItem from "components/TabletItem";

import { getAllAppointments } from "utils/services/appointmentsService";
import { appointment, state } from "utils/interfaces/appointmentInterfaces";

import style from "./Tablet.module.scss";

interface IPropsTablet {
  isLogin: boolean;
}

const Tablet = ({ isLogin }: IPropsTablet) => {
  const dispatch = useDispatch();

  const { doctors, isLoading, appointmentsState } = useSelector(
    (state: { appointmentsReducer: state }) => state.appointmentsReducer
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
        <Spin className={style.spin} size="large" />
      ) : (
        <div className={style.tablet_main}>
          {!!appointmentsState?.length &&
            appointmentsState.map((item: appointment) => (
              <TabletItem key={item._id} item={item} doctors={doctors} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Tablet;
