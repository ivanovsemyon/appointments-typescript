import { useCallback, useMemo } from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentsFilterAction,
  appointmentsSortAction,
  setEndDateAction,
  setFilteredAction,
  setStartDateAction,
} from "redux/actions";
import { applicationState } from "redux/store";

import { DatePicker } from "antd";
import queryString from "query-string";

import Button from "common/Button";
import IconButton from "common/IconButton/IconButton";

import { searchParams } from "utils/interfaces/appointmentInterfaces";

import calendar from "assets/icons/Calendar.svg";
import trash from "assets/icons/Trash.svg";

import style from "./FilteringMenu.module.scss";

const FilteringMenu = () => {
  const dispatch = useDispatch();

  const { isFiltered, startDate, endDate, sortField, orderBySort } =
    useSelector((state: applicationState) => state.appointmentsReducer);

  const filterAppointments = useCallback(() => {
    dispatch(appointmentsFilterAction());
    const search: searchParams = {};
    if (sortField) search.sortField = sortField;
    if (sortField && orderBySort) search.orderBySort = orderBySort;
    if (startDate) search.startDate = startDate;
    if (endDate) search.endDate = endDate;
    dispatch(
      push({ pathname: "/general", search: queryString.stringify(search) })
    );
  }, [dispatch, sortField, orderBySort, startDate, endDate]);

  const deleteFilter = useCallback(() => {
    dispatch(setFilteredAction(false));
    dispatch(setStartDateAction(""));
    dispatch(setEndDateAction(""));
    dispatch(appointmentsSortAction());
    const search: searchParams = {};
    if (sortField) {
      search.sortField = sortField;
      search.orderBySort = orderBySort;
    }
    dispatch(
      push({ pathname: "/general", search: queryString.stringify(search) })
    );
  }, [dispatch, sortField, orderBySort]);

  const setStartDate = useCallback(
    (date) => {
      date !== null
        ? dispatch(setStartDateAction(date.format("YYYY-MM-DD")))
        : dispatch(setStartDateAction(""));
    },
    [dispatch]
  );

  const setEndDate = useCallback(
    (date) => {
      date !== null
        ? dispatch(setEndDateAction(date.format("YYYY-MM-DD")))
        : dispatch(setEndDateAction(""));
    },
    [dispatch]
  );

  const disabledBtn = useMemo(() => {
    return startDate > endDate && endDate !== "";
  }, [startDate, endDate]);

  return (
    <>
      {isFiltered && (
        <div className={style.filter_wrapper}>
          <p className={style.filter_text}>с:</p>
          <DatePicker
            className="filter_datepicker"
            suffixIcon={<img src={calendar} alt="calendar" />}
            placeholder=""
            onChange={(date) => setStartDate(date)}
          />
          <p className={style.filter_text}>по:</p>
          <DatePicker
            className="filter_datepicker"
            suffixIcon={<img src={calendar} alt="calendar" />}
            placeholder=""
            onChange={(date) => setEndDate(date)}
          />
          <div className={style.btn_filtered}>
            <Button
              label="Фильтровать"
              type="outline-small"
              disabled={disabledBtn}
              onClick={filterAppointments}
            />
          </div>
          <div className={style.iconBtn_wrapper}>
            <IconButton iconSrc={trash} onClick={deleteFilter} />
          </div>
        </div>
      )}
    </>
  );
};

export default FilteringMenu;
