import { useCallback } from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentsSortAction,
  setFilteredAction,
  setOrderBySortAction,
  setSortFieldAction,
} from "redux/actions";
import { applicationState } from "redux/store";

import IconButton from "common/IconButton/IconButton";

import { Select } from "antd";
import queryString from "query-string";

import { searchParams } from "utils/interfaces/appointmentInterfaces";

import addFilter from "assets/icons/AddFilter.svg";
import arrow from "assets/icons/Arrow-bottom.svg";

import style from "./Sort.module.scss";

const { Option } = Select;

const Sort = () => {
  const dispatch = useDispatch();

  const {
    sortField,
    listOfFieldsSort,
    orderListSort,
    orderBySort,
    startDate,
    endDate,
    isFiltered,
  } = useSelector((state: applicationState) => state.appointmentsReducer);

  const selectFieldSortBy = useCallback(
    (value) => {
      dispatch(setSortFieldAction(value));
      dispatch(appointmentsSortAction());
      const search: searchParams = {};
      if (startDate) search.startDate = startDate;
      if (endDate) search.endDate = endDate;
      if (value) {
        search.sortField = value;
        search.orderBySort = orderBySort;
      }
      dispatch(
        push({ pathname: "/general", search: queryString.stringify(search) })
      );
    },
    [dispatch, orderBySort, startDate, endDate]
  );

  const selectOrderBySort = useCallback(
    (value) => {
      dispatch(setOrderBySortAction(value));
      dispatch(appointmentsSortAction());
      const search: searchParams = {
        sortField: sortField,
        orderBySort: value,
      };
      if (startDate) search.startDate = startDate;
      if (endDate) search.endDate = endDate;
      dispatch(
        push({ pathname: "/general", search: queryString.stringify(search) })
      );
    },
    [dispatch, sortField, startDate, endDate]
  );

  const showFilterBlock = useCallback(() => {
    dispatch(setFilteredAction(true));
  }, [dispatch]);

  return (
    <div className={style.sort_wrapper}>
      <p className={style.sort_wrapper_text}>Сортировать по:</p>
      <Select
        className="sort_wrapper_select"
        suffixIcon={<img src={arrow} alt="arrow-down" />}
        onChange={(value: string) => {
          selectFieldSortBy(value);
        }}
      >
        {listOfFieldsSort.map((item, index) => (
          <Option value={item.name} key={index}>
            {item.value}
          </Option>
        ))}
      </Select>
      {sortField && (
        <>
          <p className={style.sort_wrapper_text}>Направление:</p>
          <Select
            className="sort_wrapper_select"
            defaultValue="asc"
            suffixIcon={<img src={arrow} alt="arrow-down" />}
            onChange={(value: "asc" | "desc") => {
              selectOrderBySort(value);
            }}
          >
            {orderListSort.map((item, index) => (
              <Option value={item.order} key={index}>
                {item.value}
              </Option>
            ))}
          </Select>
        </>
      )}
      {!isFiltered && (
        <div className={style.add_filter_wrapper}>
          <p className={style.sort_wrapper_text}>Добавить фильтр по дате:</p>
          <div className={style.iconBtn_wrapper}>
            <IconButton iconSrc={addFilter} onClick={showFilterBlock} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
