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
import { IAppointment } from "../utils/interfaces/appointmentInterfaces";

export const setSortFieldAction = (sortField: string) => {
  return {
    type: SET_SORT_FIELD,
    payload: sortField,
  };
};
export const setOrderBySortAction = (orderBySort: string) => {
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

export const getAppointments = (appointments: Array<IAppointment>) => {
  return {
    type: GET_APPOINTMENTS,
    payload: appointments,
  };
};

export const addAppointment = (newAppointments: Array<IAppointment>) => {
  return {
    type: ADD_APPOINTMENTS,
    payload: newAppointments,
  };
};

export const editAppointmentAction = (
  editedAppointment: Array<IAppointment>
) => {
  return {
    type: EDIT_APPOINTMENTS,
    payload: editedAppointment,
  };
};

export const deleteAppointment = (result: Array<IAppointment>) => {
  return {
    type: DELETE_APPOINTMENTS,
    payload: result,
  };
};
