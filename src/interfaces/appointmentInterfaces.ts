export interface IAppointment {
    _id: string,
    name: string,
    doctor: string,
    date: string,
    complaint: string
}

export interface IListOfFieldsSort {
    name: string,
    value: string
}

export interface IOrderListSort {
    order: string,
    value: string
}

export interface IState {
    appointmentsState: Array<IAppointment>,
    initialState: Array<IAppointment>,
    sortField: string,
    orderBySort: "asc" | "desc",
    isFiltered: boolean,
    startDate: string,
    endDate: string,
    doctors: Array<string>,
    listOfFieldsSort: Array<IListOfFieldsSort>,
    orderListSort: Array<IOrderListSort>
}


