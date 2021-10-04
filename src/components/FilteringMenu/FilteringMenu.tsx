import { useCallback, useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentsFilterAction,
  appointmentsSortAction,
  setEndDateAction,
  setFilteredAction,
  setStartDateAction,
} from "../../redux/actions";

import { DatePicker } from "antd";
import queryString from "query-string";

import Button from "common/Button";

import calendar from "assets/icons/Calendar.svg";
import trash from "assets/icons/Trash.svg";

import style from "./FilteringMenu.module.scss";
import { applicationState } from "../../redux/store";
import { searchParams } from "../../utils/interfaces/appointmentInterfaces";
import ButtonIcon from "../../common/ButtonIcon/ButtonIcon";

const FilteringMenu = () => {
  const dispatch = useDispatch();

  const isFiltered = useSelector(
    (state: applicationState) => state.appointmentsReducer.isFiltered
  );
  const startDate = useSelector(
    (state: applicationState) => state.appointmentsReducer.startDate
  );
  const endDate = useSelector(
    (state: applicationState) => state.appointmentsReducer.endDate
  );
  const sortFieldIsSelected = useSelector(
    (state: applicationState) => state.appointmentsReducer.sortField
  );
  const orderBySort = useSelector(
    (state: applicationState) => state.appointmentsReducer.orderBySort
  );

  const history = useSelector(
    (state: applicationState) => state.router.location
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
    const search: searchParams = {};
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
    const search: searchParams = {};
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
            label="Фильтровать"
            type="outline-small"
            disabled={startDate > endDate && endDate !== "" && true}
            onClick={filterAppointments}
          />
          <div className={style.iconBtn_wrapper}>
            <ButtonIcon iconSrc={trash} onClick={deleteFilter} />
          </div>
        </div>
      )}
    </>
  );
};

export default FilteringMenu;
