import { IState } from "../utils/interfaces/appointmentInterfaces";

export const initialState = {
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
} as IState;
