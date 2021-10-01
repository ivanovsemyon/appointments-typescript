import { useCallback, useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentsSortAction,
  setFilteredAction,
  setOrderBySortAction,
  setSortFieldAction,
} from "../../redux/actions";

import { Select } from "antd";
import queryString from "query-string";

import { searchParams } from "utils/interfaces/appointmentInterfaces";

import addFilter from "assets/icons/AddFilter.svg";
import arrow from "assets/icons/Arrow-bottom.svg";

import style from "./SortMenu.module.scss";
import { applicationState } from "../../redux/store";

const { Option } = Select;

const SortMenu = () => {
  const dispatch = useDispatch();

  const sortFieldIsSelected = useSelector(
    (state: applicationState) => state.appointmentsReducer.sortField
  );
  const listOfFieldsSort = useSelector(
    (state: applicationState) => state.appointmentsReducer.listOfFieldsSort
  );
  const orderListSort = useSelector(
    (state: applicationState) => state.appointmentsReducer.orderListSort
  );
  const orderBySort = useSelector(
    (state: applicationState) => state.appointmentsReducer.orderBySort
  );
  const startDate = useSelector(
    (state: applicationState) => state.appointmentsReducer.startDate
  );
  const endDate = useSelector(
    (state: applicationState) => state.appointmentsReducer.endDate
  );
  const isFiltered = useSelector(
    (state: applicationState) => state.appointmentsReducer.isFiltered
  );

  const history = useSelector(
    (state: applicationState) => state.router.location
  );

  useEffect(() => {
    if (history.query.sortField) {
      dispatch(setSortFieldAction(history.query.sortField));
      dispatch(setOrderBySortAction(history.query.orderBySort));
      dispatch(appointmentsSortAction());
    }
  }, [history, dispatch]);

  const selectFieldSortBy = useCallback(
    (value) => {
      if (value) {
        dispatch(setSortFieldAction(value));
        dispatch(appointmentsSortAction());
        const search: searchParams = {
          sortField: value,
          orderBySort,
        };
        if (startDate) search.startDate = startDate;
        if (endDate) search.endDate = endDate;
        dispatch(
          push({ pathname: "/general", search: queryString.stringify(search) })
        );
      } else {
        dispatch(setSortFieldAction(value));
        dispatch(appointmentsSortAction());
        const search: searchParams = {};
        if (startDate) search.startDate = startDate;
        if (endDate) search.endDate = endDate;
        dispatch(
          push({ pathname: "/general", search: queryString.stringify(search) })
        );
      }
    },
    [dispatch, orderBySort, startDate, endDate]
  );

  const selectOrderBySort = useCallback(
    (value) => {
      dispatch(setOrderBySortAction(value));
      dispatch(appointmentsSortAction());
      const search: searchParams = {
        sortField: sortFieldIsSelected,
        orderBySort: value,
      };
      if (startDate) search.startDate = startDate;
      if (endDate) search.endDate = endDate;
      dispatch(
        push({ pathname: "/general", search: queryString.stringify(search) })
      );
    },
    [dispatch, sortFieldIsSelected, startDate, endDate]
  );

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
      {sortFieldIsSelected && (
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
          <button
            className={style.add_filter_btn}
            onClick={() => dispatch(setFilteredAction(true))}
          >
            <img src={addFilter} alt="add-filter" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
