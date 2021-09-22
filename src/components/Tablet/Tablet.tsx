import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAppointments,
  appointmentsStateSlice,
  doctorsStateSlice,
} from "../../redux/appointmentSlice";

import TabletItem from "../TabletItem/TabletItem";

import style from "./Tablet.module.scss";

interface IPropsTablet {
  isLogin: boolean
}

const Tablet = ({ isLogin }: IPropsTablet) => {
  const dispatch = useDispatch();
  const appointments = useSelector(appointmentsStateSlice);
  const doctors = useSelector(doctorsStateSlice);

  useEffect(() => {
    if (
        isLogin &&
      !!localStorage.getItem("token") &&
      !!localStorage.getItem("user")
    ) {
      dispatch(getAppointments());
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
      <div className={style.tablet_main}>
        {!!appointments?.length &&
          appointments.map((item) => (
            <TabletItem
              key={item._id}
              item={item}
              doctors={doctors}
            />
          ))}
      </div>
    </div>
  );
};

export default Tablet;
