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
} from './types';

export const setSortFieldAction = () => {
  return {
    type: SET_SORT_FIELD,
  };
};
export const setOrderBySortAction = () => {
  return {
    type: SET_ORDER_BY_SORT,
  };
};
export const setFilteredAction = () => {
  return {
    type: SET_FILTERED,
  };
};
export const setStartDateAction = () => {
  return {
    type: SET_START_DATE,
  };
};
export const setEndDateAction = () => {
  return {
    type: SET_END_DATE,
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

export const getAppointments = () => {
  return {
    type: GET_APPOINTMENTS,
  };
};
export const addAppointment = () => {
  return {
    type: ADD_APPOINTMENTS,
  };
};
export const editAppointment = () => {
  return {
    type: EDIT_APPOINTMENTS,
  };
};
export const removeAppointment = () => {
  return {
    type: DELETE_APPOINTMENTS,
  };
};
