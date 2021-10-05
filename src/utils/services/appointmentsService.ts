import axios from "axios";
import baseRoute from "../baseRoute";
import { appointment } from "../interfaces/appointmentInterfaces";
import {
  addAppointment,
  deleteAppointment,
  editAppointmentAction,
  getAppointments,
} from "../../redux/actions";
import { AppDispatch } from "../../redux/store";

export class API {
  location = baseRoute;

  getAllAppointments() {
    return (dispatch: AppDispatch) => {
      axios
        .get(baseRoute("getAllAppointments"))
        .then((result): { payload: Array<appointment>; type: string } =>
          dispatch(getAppointments(result.data))
        );
    };
  }

  createAppointment({
    name,
    doctor,
    date,
    complaint,
  }: {
    name: string;
    doctor: string;
    date: string;
    complaint: string;
  }) {
    return (dispatch: AppDispatch) => {
      axios
        .post(baseRoute("createAppointment"), {
          name: name,
          doctor: doctor,
          date: date,
          complaint: complaint,
        })
        .then((result: { data: Array<appointment> }) => {
          dispatch(addAppointment(result.data));
        });
    };
  }

  changeAppointment({
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
  }) {
    return (dispatch: AppDispatch) => {
      axios
        .post(baseRoute("editAppointment"), {
          _id: _id,
          name: name,
          doctor: doctor,
          date: date,
          complaint: complaint,
        })
        .then((result: { data: Array<appointment> }) =>
          dispatch(editAppointmentAction(result.data))
        );
    };
  }

  removeAppointment(id: string) {
    return (dispatch: AppDispatch) => {
      axios
        .delete(baseRoute(`deleteAppointments?id=${id}`))
        .then((res: { data: Array<appointment> }) => {
          dispatch(deleteAppointment(res.data));
        });
    };
  }
}

export const getAllAppointments = (token: string | null) => {
  return (dispatch: AppDispatch) => {
    axios
      .get(baseRoute("getAllAppointments"), {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result): { payload: Array<appointment>; type: string } =>
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
      .then((result: { data: Array<appointment> }) => {
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
      .then((result: { data: Array<appointment> }) =>
        dispatch(editAppointmentAction(result.data))
      );
  };
};

export const removeAppointment = (id: string) => {
  return (dispatch: AppDispatch) => {
    axios
      .delete(baseRoute(`deleteAppointments?id=${id}`))
      .then((res: { data: Array<appointment> }) => {
        dispatch(deleteAppointment(res.data));
      });
  };
};
