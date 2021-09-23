import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  appointmentsFilterAction,
  appointmentsSortAction,
  listOfFieldsSortSlice,
  orderListSortSlice,
  setFilteredAction,
  setOrderBySortAction,
  setSortFieldAction,
  sortFieldSlice,
} from "../../redux/appointmentSlice";

import { Select } from "antd";

import arrow from "../../icons/Arrow-bottom.svg";
import addFilter from "../../icons/AddFilter.svg";

import style from "./SortMenu.module.scss";

const { Option } = Select;

const SortMenu = () => {
  const dispatch = useDispatch();
  const sortFieldIsSelected = useSelector(sortFieldSlice);
  const listOfFieldsSort = useSelector(listOfFieldsSortSlice);
  const orderListSort = useSelector(orderListSortSlice);

  const selectFieldSortBy = useCallback(() => {
    dispatch(appointmentsSortAction());
    dispatch(appointmentsFilterAction());
  }, [dispatch]);

  return (
    <div className={style.sort_wrapper}>
      <p className={style.sort_wrapper_text}>Сортировать по:</p>
      <Select
        className="sort_wrapper_select"
        suffixIcon={<img src={arrow} alt="arrow-down" />}
        onChange={(value: string) => {
          dispatch(setSortFieldAction(value));
          selectFieldSortBy();
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
              dispatch(setOrderBySortAction(value));
              selectFieldSortBy();
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
      <div className={style.add_filter_wrapper}>
        <p className={style.sort_wrapper_text}>Добавить фильтр по дате:</p>
        <button
          className={style.add_filter_btn}
          onClick={() => dispatch(setFilteredAction(true))}
        >
          <img src={addFilter} alt="add-filter" />
        </button>
      </div>
    </div>
  );
};

export default SortMenu;
