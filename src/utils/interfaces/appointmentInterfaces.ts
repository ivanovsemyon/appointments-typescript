export interface appointment {
  _id: string;
  name: string;
  doctor: string;
  date: string;
  complaint: string;
}

export interface listOfFieldsSort {
  name: string;
  value: string;
}

export interface orderListSort {
  order: string;
  value: string;
}

export interface state {
  appointmentsState: Array<appointment>;
  initialState: Array<appointment>;
  sortField: string;
  orderBySort: "asc" | "desc";
  isFiltered: boolean;
  startDate: string;
  endDate: string;
  doctors: Array<string>;
  listOfFieldsSort: Array<listOfFieldsSort>;
  orderListSort: Array<orderListSort>;
  isLoading: boolean;
}

export interface searchParams {
  sortField?: string;
  orderBySort?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}
