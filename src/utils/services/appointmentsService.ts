import axios from "axios";
import baseRoute from "../baseRoute";
import { IAppointment } from "../interfaces/appointmentInterfaces";
import {
  addAppointment,
  deleteAppointment,
  editAppointmentAction,
  getAppointments,
} from "../../redux/actions";
import { AppDispatch } from "../../redux/store";

export const getAllAppointments = () => {
  return (dispatch: AppDispatch) => {
    axios
      .get(baseRoute("getAllAppointments"))
      .then((result): { payload: Array<IAppointment>; type: string } =>
        dispatch(getAppointments(result.data))
      );
  };
};

export const createAppointment = ({
  name,
  doctor,
  date,
  complaint,
}: {
  name: string;
  doctor: string;
  date: string;
  complaint: string;
}) => {
  return (dispatch: AppDispatch) => {
    axios
      .post(baseRoute("createAppointment"), {
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
      .then((result: { data: Array<IAppointment> }) => {
        dispatch(addAppointment(result.data));
      });
  };
};

export const changeAppointment = ({
  _id,
  name,
  doctor,
  date,
  complaint,
}: {
  _id: string;
  name: string;
  doctor: string;
  date: string;
  complaint: string;
}) => {
  return (dispatch: AppDispatch) => {
    axios
      .post(baseRoute("editAppointment"), {
        _id: _id,
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
      .then((result: { data: Array<IAppointment> }) =>
        dispatch(editAppointmentAction(result.data))
      );
  };
};

export const removeAppointment = (id: string) => {
  return (dispatch: AppDispatch) => {
    axios
      .delete(baseRoute(`deleteAppointments?id=${id}`))
      .then((res: { data: Array<IAppointment> }) => {
        dispatch(deleteAppointment(res.data));
      });
  };
};
