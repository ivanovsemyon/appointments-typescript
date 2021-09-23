import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { filter, inRange, merge, orderBy, remove, uniqBy, find } from "lodash";

import {
  createAppointment,
  deleteAppointment,
  editAppointment,
  getAllAppointments,
} from "../services/appointmentsService";
import { IAppointment, IState } from "../interfaces/appointmentInterfaces";

export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async (_, { rejectWithValue }) => getAllAppointments(rejectWithValue)
);

export const addAppointment = createAsyncThunk(
  "appointments/addAppointment",
  async (
    {
      name,
      doctor,
      date,
      complaint,
    }: {
      name: string;
      doctor: string;
      date: string;
      complaint: string;
    },
    { rejectWithValue }
  ) => createAppointment(name, doctor, date, complaint, rejectWithValue)
);

export const removeAppointment = createAsyncThunk(
  "appointments/removeAppointment",
  (id: string, { rejectWithValue }) => deleteAppointment(id, rejectWithValue)
);

export const changeAppointment = createAsyncThunk(
  "appointments/changeAppointment",
  ({ _id, name, doctor, date, complaint }: IAppointment, { rejectWithValue }) =>
    editAppointment(_id, name, doctor, date, complaint, rejectWithValue)
);

const filterList = (state: IState) => {
  if (state.startDate && !state.endDate) {
    state.appointmentsState = filter(
      state.sortField
        ? orderBy(state.initialState, state.sortField, state.orderBySort)
        : state.initialState,
      (o) => o.date >= state.startDate
    );
  } else if (state.endDate && !state.startDate) {
    state.appointmentsState = filter(
      state.sortField
        ? orderBy(state.initialState, state.sortField, state.orderBySort)
        : state.initialState,
      (o) => o.date <= state.endDate
    );
  } else if (state.startDate && state.endDate) {
    state.appointmentsState = filter(
      state.sortField
        ? orderBy(state.initialState, state.sortField, state.orderBySort)
        : state.initialState,
      (o) =>
        inRange(
          +o.date.split("-").join(""),
          +state.startDate.split("-").join(""),
          +state.endDate.split("-").join("") + 1
        )
    );
  }
};

const appointmentSlice = createSlice({
  name: "appointments",

  initialState: {
    appointmentsState: [],
    initialState: [],
    sortField: "",
    orderBySort: "asc",
    isFiltered: false,
    startDate: "",
    endDate: "",
    doctors: [
      "Иванов Иван Иванович",
      "Петров Петр Петрович",
      "Сидров Сидр Сидорович",
      "Семенов Семен Семенович",
    ],
    listOfFieldsSort: [
      { name: "name", value: "Имя" },
      { name: "doctor", value: "Врач" },
      { name: "date", value: "Дата" },

      { name: "", value: "Сбросить" },
    ],
    orderListSort: [
      { order: "asc", value: "По возрастанию" },
      { order: "desc", value: "По убыванию" },
    ],
    isLoading: true,
  } as IState,

  reducers: {
    setSortFieldAction(state: IState, action: { payload: string }) {
      state.sortField = action.payload;
    },

    setOrderBySortAction(state: IState, action: { payload: "asc" | "desc" }) {
      state.orderBySort = action.payload;
    },

    setFilteredAction(state: IState, action: { payload: boolean }) {
      state.isFiltered = action.payload;
    },

    setStartDateAction(state: IState, action: { payload: string }) {
      state.startDate = action.payload;
    },

    setEndDateAction(state: IState, action: { payload: string }) {
      state.endDate = action.payload;
    },

    appointmentsSortAction(state: IState) {
      if (state.sortField) {
        state.appointmentsState = orderBy(
          state.isFiltered ? state.appointmentsState : state.initialState,
          state.sortField,
          state.orderBySort
        );
      } else if (!state.sortField && (!state.startDate || !state.endDate)) {
        state.appointmentsState = state.initialState;
        state.orderBySort = "asc";
      }
    },

    appointmentsFilterAction(state: IState) {
      filterList(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.fulfilled, (state: IState, { payload }) => {
        state.isLoading = false;
        state.appointmentsState = payload;
        state.initialState = payload;
      })
      .addCase(getAppointments.rejected, (state: IState, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(getAppointments.pending, (state: IState, { payload }) => {
        state.isLoading = true;
      })
      .addCase(addAppointment.fulfilled, (state: IState, { payload }) => {
        state.initialState = uniqBy(state.initialState.concat(payload), "_id");
        state.appointmentsState = uniqBy(
          state.appointmentsState.concat(payload),
          "_id"
        );
        if (state.sortField && !state.isFiltered) {
          state.appointmentsState = orderBy(
            state.appointmentsState,
            state.sortField,
            state.orderBySort
          );
        } else if (state.isFiltered) {
          filterList(state);
        }
      })
      .addCase(addAppointment.rejected, (state: IState, { payload }) => {
        console.log(payload);
      })
      .addCase(removeAppointment.fulfilled, (state: IState, { meta }) => {
        remove(state.initialState, { _id: meta.arg });
        remove(state.appointmentsState, { _id: meta.arg });
      })
      //TODO: rejected возвращает undefined
      .addCase(removeAppointment.rejected, (state: IState, { payload }) => {
        console.log(payload);
      })
      .addCase(changeAppointment.fulfilled, (state, { payload, meta }) => {
        merge(find(state.initialState, { _id: meta.arg._id }), payload[0]);
        merge(find(state.appointmentsState, { _id: meta.arg._id }), payload[0]);
        if (state.startDate !== "" || state.endDate !== "") {
          if (
            !inRange(
              +payload[0].date.split("-").join(""),
              +state.startDate.split("-").join(""),
              (+state.endDate.split("-").join("") || Infinity) + 1
            )
          ) {
            remove(state.appointmentsState, { _id: meta.arg._id });
          }
        }
        if (state.sortField) {
          state.appointmentsState = orderBy(
            state.appointmentsState,
            state.sortField,
            state.orderBySort
          );
        }
      })
      .addCase(changeAppointment.rejected, (state: IState, { payload }) => {
        console.log(payload);
      });
  },
});

export const {
  appointmentsSortAction,
  appointmentsFilterAction,
  setFilteredAction,
  setSortFieldAction,
  setOrderBySortAction,
  setStartDateAction,
  setEndDateAction,
} = appointmentSlice.actions;

export const appointmentsStateSlice = (state: { appointments: IState }) =>
  state.appointments.appointmentsState;

export const isFilteredSlice = (state: { appointments: IState }) =>
  state.appointments.isFiltered;

export const sortFieldSlice = (state: { appointments: IState }) =>
  state.appointments.sortField;
export const startDateSlice = (state: { appointments: IState }) =>
  state.appointments.startDate;
export const endDateSlice = (state: { appointments: IState }) =>
  state.appointments.endDate;

export const doctorsStateSlice = (state: { appointments: IState }) =>
  state.appointments.doctors;

export const listOfFieldsSortSlice = (state: { appointments: IState }) =>
  state.appointments.listOfFieldsSort;

export const orderListSortSlice = (state: { appointments: IState }) =>
  state.appointments.orderListSort;

export const isLoadingSlice = (state: { appointments: IState }) =>
  state.appointments.isLoading;

export default appointmentSlice.reducer;
