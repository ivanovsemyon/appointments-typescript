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
import { initialState } from "./initialState";
import {
  addNewAppointment,
  deleteAppointment,
  editAppointment,
  filterList,
  sortList,
} from "./secondaryFunctionsReducers";
import { IState } from "../interfaces/appointmentInterfaces";

export const appointmentsReducer = (
  state: IState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
      };

    case SET_ORDER_BY_SORT:
      return {
        ...state,
        orderBySort: action.payload,
      };

    case SET_FILTERED:
      return {
        ...state,
        isFiltered: action.payload,
      };

    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };

    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };

    case APPOINTMENTS_SORT:
      return sortList(state);

    case APPOINTMENTS_FILTER:
      return filterList(state);

    case GET_APPOINTMENTS:
      return {
        ...state,
        isLoading: false,
        appointmentsState: action.payload,
        initialState: action.payload,
      };

    case ADD_APPOINTMENTS:
      return addNewAppointment(state, action.payload);

    case EDIT_APPOINTMENTS:
      return editAppointment(state, action);

    case DELETE_APPOINTMENTS:
      return deleteAppointment(state, action.payload);

    default:
      return state;
  }
};
