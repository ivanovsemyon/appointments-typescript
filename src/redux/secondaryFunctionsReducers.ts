import { filter, inRange, orderBy } from "lodash";
import { IAppointment, IState } from "../interfaces/appointmentInterfaces";

export const sortList = (state: IState) => {
  if (state.sortField) {
    return {
      ...state,
      appointmentsState: orderBy(
        state.isFiltered ? state.appointmentsState : state.initialState,
        state.sortField,
        state.orderBySort
      ),
    };
  } else if (!state.sortField && (!state.startDate || !state.endDate)) {
    return {
      ...state,
      appointmentsState: state.initialState,
      orderBySort: "asc",
    };
  }
};

export const filterList = (state: IState) => {
  if (state.startDate && !state.endDate) {
    return {
      ...state,
      appointmentsState: filter(
        state.sortField
          ? orderBy(state.initialState, state.sortField, state.orderBySort)
          : state.initialState,
        (o) => o.date >= state.startDate
      ),
    };
  } else if (state.endDate && !state.startDate) {
    return {
      ...state,
      appointmentsState: filter(
        state.sortField
          ? orderBy(state.initialState, state.sortField, state.orderBySort)
          : state.initialState,
        (o) => o.date <= state.endDate
      ),
    };
  } else if (state.startDate && state.endDate) {
    return {
      ...state,
      appointmentsState: filter(
        state.sortField
          ? orderBy(state.initialState, state.sortField, state.orderBySort)
          : state.initialState,
        (o) =>
          inRange(
            +o.date.split("-").join(""),
            +state.startDate.split("-").join(""),
            +state.endDate.split("-").join("") + 1
          )
      ),
    };
  } else {
    return state;
  }
};

export const addNewAppointment = (
  state: IState,
  payload: Array<IAppointment>
) => {
  const result = {
    ...state,
    initialState: payload,
    appointmentsState: payload,
  };
  if (state.sortField && !state.isFiltered) {
    return sortList(result);
  } else if (state.isFiltered) {
    return filterList(result);
  }
  return result;
};

export const editAppointment = (state: IState, action: any) => {
  const result = {
    ...state,
    initialState: action.payload,
    appointmentsState: action.payload,
  };
  if (state.sortField && !state.isFiltered) {
    return sortList(result);
  } else if (state.isFiltered) {
    return filterList(result);
  }
  return result;
};

export const deleteAppointment = (
  state: IState,
  payload: Array<IAppointment>
) => {
  const result = {
    ...state,
    initialState: payload,
    appointmentsState: payload,
  };
  if (state.sortField && !state.isFiltered) {
    return sortList(result);
  } else if (state.isFiltered) {
    return filterList(result);
  }
  return result;
};
