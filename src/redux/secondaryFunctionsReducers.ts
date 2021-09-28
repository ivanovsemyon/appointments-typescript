import { IAppointment, IState } from "../interfaces/appointmentInterfaces";
import { filter, find, inRange, merge, orderBy, remove } from "lodash";

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

export const addNewAppointment = (state: IState, payload: IAppointment) => {
  const result = {
    ...state,
    initialState: state.initialState.concat(payload),
    appointmentsState: state.appointmentsState.concat(payload),
  };
  if (state.sortField && !state.isFiltered) {
    return {
      ...result,
      appointmentsState: orderBy(
        result.appointmentsState,
        result.sortField,
        result.orderBySort
      ),
    };
  } else if (state.isFiltered) {
    return filterList(result);
  }
  return result;
};

export const editAppointment = (state: IState, action: any) => {
  const result = {
    ...state,
  };
  merge(
    find(result.initialState, { _id: action.payload[0]._id }),
    action.payload[0]
  );
  merge(
    find(result.appointmentsState, { _id: action.payload[0]._id }),
    action.payload[0]
  );
  if (state.startDate !== "" || state.endDate !== "") {
    if (
      !inRange(
        +action.payload[0].date.split("-").join(""),
        +state.startDate.split("-").join(""),
        (+state.endDate.split("-").join("") || Infinity) + 1
      )
    ) {
      remove(result.appointmentsState, { _id: action.payload[0]._id });
    }
  }
  if (state.sortField) {
    result.appointmentsState = orderBy(
      result.appointmentsState,
      result.sortField,
      result.orderBySort
    );
  }
  return result;
};

export const deleteAppointment = (state: IState, payload: string) => {
  return {
    ...state,
    initialState: filter(state.initialState, (o) => o._id !== payload),
    appointmentsState: filter(
      state.appointmentsState,
      (o) => o._id !== payload
    ),
  };
};
