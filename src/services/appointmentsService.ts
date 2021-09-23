import axios from "axios";
import baseRoute from "../utils/baseRoute";
import { IAppointment } from "../interfaces/appointmentInterfaces";

export const getAllAppointments = (rejectWithValue: any) => {
  try {
    return axios
      .get(baseRoute("getAllAppointments"))
      .then((result): Array<IAppointment> => result.data);
  } catch (e: any) {
    return rejectWithValue(e);
  }
};

export const createAppointment = (
  name: string,
  doctor: string,
  date: string,
  complaint: string,
  rejectWithValue: any
) => {
  try {
    return axios
      .post(baseRoute("createAppointment"), {
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
      .then((result: { data: IAppointment }) => {
        return result.data;
      });
  } catch (e: any) {
    return rejectWithValue(e);
  }
};

export const editAppointment = (
  _id: string,
  name: string,
  doctor: string,
  date: string,
  complaint: string,
  rejectWithValue: any
) => {
  try {
    return axios
      .post(baseRoute("editAppointment"), {
        _id: _id,
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
      .then((result: { data: IAppointment }) => result.data);
  } catch (e: any) {
    return rejectWithValue(e);
  }
};

export const deleteAppointment = async (id: string, rejectWithValue: any) => {
  try {
    await axios.delete(baseRoute(`deleteAppointments?id=${id}`));
  } catch (e: any) {
    return rejectWithValue(e);
  }
};
