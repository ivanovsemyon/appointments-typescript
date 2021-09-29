import { useCallback, useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentsFilterAction,
  appointmentsSortAction,
  setEndDateAction,
  setFilteredAction,
  setOrderBySortAction,
  setSortFieldAction,
  setStartDateAction,
} from "../../redux/actions";

import { DatePicker } from "antd";
import queryString from "query-string";

import Button from "../Button/Button";

import { IState } from "../../interfaces/appointmentInterfaces";

import calendar from "../../icons/Calendar.svg";
import trash from "../../icons/Trash.svg";

import style from "./FilteringMenu.module.scss";

const FilteringMenu = () => {
  const dispatch = useDispatch();

  const isFiltered = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.isFiltered
  );
  const startDate = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.startDate
  );
  const endDate = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.endDate
  );
  const sortFieldIsSelected = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.sortField
  );
  const orderBySort = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.orderBySort
  );

  const history = useSelector(
    (state: { router: any }) => state.router.location
  );

  useEffect(() => {
    if (history.query.startDate || history.query.startDate) {
      dispatch(setFilteredAction(true));
      dispatch(setStartDateAction(history.query.startDate));
      dispatch(setEndDateAction(history.query.endDate));
      dispatch(appointmentsSortAction());
    }
  }, [history, dispatch]);

  const filterAppointments = useCallback(() => {
    dispatch(appointmentsFilterAction());
    const search: any = {};
    if (sortFieldIsSelected) search.sortField = sortFieldIsSelected;
    if (sortFieldIsSelected && orderBySort) search.orderBySort = orderBySort;
    if (startDate) search.startDate = startDate;
    if (endDate) search.endDate = endDate;
    dispatch(
      push({ pathname: "/general", search: queryString.stringify(search) })
    );
  }, [dispatch, sortFieldIsSelected, orderBySort, startDate, endDate]);

  const deleteFilter = useCallback(() => {
    dispatch(setFilteredAction(false));
    dispatch(setStartDateAction(""));
    dispatch(setEndDateAction(""));
    dispatch(appointmentsSortAction());
    const search: any = {};
    if (sortFieldIsSelected) search.sortField = sortFieldIsSelected;
    if (sortFieldIsSelected && orderBySort) search.orderBySort = orderBySort;
    dispatch(
      push({ pathname: "/general", search: queryString.stringify(search) })
    );
  }, [dispatch, sortFieldIsSelected, orderBySort]);

  return (
    <>
      {isFiltered && (
        <div className={style.filter_wrapper}>
          <p className={style.filter_text}>с:</p>
          <DatePicker
            className="filter_datepicker"
            suffixIcon={<img src={calendar} alt="calendar" />}
            placeholder=""
            onChange={(date) => {
              date !== null
                ? dispatch(setStartDateAction(date.format("YYYY-MM-DD")))
                : dispatch(setStartDateAction(""));
            }}
          />
          <p className={style.filter_text}>по:</p>

          <DatePicker
            className="filter_datepicker"
            suffixIcon={<img src={calendar} alt="calendar" />}
            placeholder=""
            onChange={(date) => {
              date !== null
                ? dispatch(setEndDateAction(date.format("YYYY-MM-DD")))
                : dispatch(setEndDateAction(""));
            }}
          />
          <Button
            className={style.btn_filtered}
            label="Фильтровать"
            height="40px"
            fontSize="18px"
            margin="0 32px 0 16px"
            disabled={startDate > endDate && endDate !== "" && true}
            onClick={filterAppointments}
          />
          <button className={style.btn_delete_filter} onClick={deleteFilter}>
            <img src={trash} alt="delete-filter" />
          </button>
        </div>
      )}
    </>
  );
};

export default FilteringMenu;
