import {
  ADD_APPOINTMENTS,
  APPOINTMENTS_FILTER,
  APPOINTMENTS_SORT,
  DELETE_APPOINTMENTS,
  EDIT_APPOINTMENTS,
  GET_APPOINTMENTS,
  SET_END_DATE,
  SET_FILTERED,
  SET_ORDER_BY_SORT,
  SET_SORT_FIELD,
  SET_START_DATE,
} from "./types";
import axios from "axios";
import baseRoute from "../utils/baseRoute";
import { IAppointment } from "../interfaces/appointmentInterfaces";

export const setSortFieldAction = (sortField: string) => {
  return {
    type: SET_SORT_FIELD,
    payload: sortField,
  };
};
export const setOrderBySortAction = (orderBySort: "asc" | "desc") => {
  return {
    type: SET_ORDER_BY_SORT,
    payload: orderBySort,
  };
};
export const setFilteredAction = (isFiltered: boolean) => {
  return {
    type: SET_FILTERED,
    payload: isFiltered,
  };
};
export const setStartDateAction = (startDate: string) => {
  return {
    type: SET_START_DATE,
    payload: startDate,
  };
};
export const setEndDateAction = (endDate: string) => {
  return {
    type: SET_END_DATE,
    payload: endDate,
  };
};
export const appointmentsSortAction = () => {
  return {
    type: APPOINTMENTS_SORT,
  };
};
export const appointmentsFilterAction = () => {
  return {
    type: APPOINTMENTS_FILTER,
  };
};

export const getAllAppointments = () => {
  return (dispatch: any) => {
    axios
      .get(baseRoute("getAllAppointments"))
      .then(
        (result): Array<IAppointment> => dispatch(getAppointments(result.data))
      );
  };
};

export const getAppointments = (appointments: Array<IAppointment>) => {
  return {
    type: GET_APPOINTMENTS,
    payload: appointments,
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
      .then((result: { data: IAppointment }) => {
        dispatch(addAppointment(result.data));
      });
  };
};

export const addAppointment = (newAppointment: IAppointment) => {
  return {
    type: ADD_APPOINTMENTS,
    payload: newAppointment,
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

export const editAppointmentAction = (editedAppointment: IAppointment) => {
  return {
    type: EDIT_APPOINTMENTS,
    payload: editedAppointment,
  };
};

export const removeAppointment = (id: string) => {
  return (dispatch: any) => {
    axios.delete(baseRoute(`deleteAppointments?id=${id}`)).then((res) => {
      dispatch(deleteAppointment(id));
    });
  };
};

export const deleteAppointment = (id: string) => {
  return {
    type: DELETE_APPOINTMENTS,
    payload: id,
  };
};
