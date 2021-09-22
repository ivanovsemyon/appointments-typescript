import axios from "axios";
import baseRoute from "../utils/baseRoute";

export const getAllAppointments = () => {
  try {
    return axios
      .get(baseRoute("getAllAppointments"))
      .then((result) => result.data);
  } catch (e) {
    console.log(e, "Ошибка");
  }
};

export const createAppointment = ( name: string, doctor: string, date: string, complaint: string) => {
  try {
    return axios
      .post(baseRoute("createAppointment"), {
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
      .then((result) => {
        return result.data;
      });
  } catch (e) {
    console.log(e, "Ошибка");
  }
};

export const editAppointment = ( _id: string, name: string, doctor: string, date: string, complaint: string ) => {
  try {
    return axios
      .post(baseRoute("editAppointment"), {
        _id: _id,
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
      .then((result) => result.data);
  } catch (e) {
    console.log(e, "Ошибка");
  }
};

export const deleteAppointment = (id: string) => {
  try {
    return axios
      .delete(baseRoute(`deleteAppointments?id=${id}`))
      .then((result) => result.data);
  } catch (e) {
    console.log(e, "Ошибка");
  }
};
