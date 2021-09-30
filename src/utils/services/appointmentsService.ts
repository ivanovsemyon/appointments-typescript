import axios from "axios";
import baseRoute from "../utils/baseRoute";
import { IAppointment } from "../interfaces/appointmentInterfaces";
import {
  addAppointment,
  deleteAppointment,
  editAppointmentAction,
  getAppointments,
} from "../redux/actions";

export const getAllAppointments = () => {
  return (dispatch: any) => {
    axios
      .get(baseRoute("getAllAppointments"))
      .then(
        (result): Array<IAppointment> => dispatch(getAppointments(result.data))
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
  return (dispatch: any) => {
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
  return (dispatch: any) => {
    axios
      .post(baseRoute("editAppointment"), {
        _id: _id,
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
      .then((result: { data: IAppointment }) =>
        dispatch(editAppointmentAction(result.data))
      );
  };
};

export const removeAppointment = (id: string) => {
  return (dispatch: any) => {
    axios
      .delete(baseRoute(`deleteAppointments?id=${id}`))
      .then((res: { data: Array<IAppointment> }) => {
        dispatch(deleteAppointment(res.data));
      });
  };
};
