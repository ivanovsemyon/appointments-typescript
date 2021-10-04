import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DatePicker, Select } from "antd";

import Button from "common/Button";

import { createAppointment } from "utils/services/appointmentsService";
import { state } from "utils/interfaces/appointmentInterfaces";

import arrow from "assets/icons/Arrow-bottom.svg";
import calendar from "assets/icons/Calendar.svg";

import style from "./AddNewAppointment.module.scss";

const { Option } = Select;

const AddNewAppointment = () => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");

  const dispatch = useDispatch();

  const doctors = useSelector(
    (state: { appointmentsReducer: state }) => state.appointmentsReducer.doctors
  );

  const disabledBtn = useMemo(() => {
    return !name.trim() || !doctor.trim() || !date.trim() || !complaint.trim();
  }, [name, doctor, date, complaint]);

  const addNewAppointment = useCallback(() => {
    if (!disabledBtn) {
      dispatch(
        createAppointment({
          name,
          doctor,
          date,
          complaint,
        })
      );
      setName("");
      setDoctor("");
      setComplaint("");
    }
  }, [disabledBtn, name, doctor, date, complaint, dispatch]);

  return (
    <div className={style.general_form}>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Имя:</label>
        <input
          type="text"
          className={style.general_appointments_input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Врач:</label>
        <Select
          className="general-form-select"
          value={doctor}
          suffixIcon={<img src={arrow} alt="arrow-down" />}
          onChange={(value) => setDoctor(value)}
        >
          {doctors.map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Дата:</label>
        <DatePicker
          className="general-form-datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date, dateStr) => setDate(dateStr)}
        />
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Жалобы:</label>
        <input
          type="text"
          className={style.general_appointments_input}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <div className={style.general_appointments_button}>
        <Button
          label="Добавить"
          disabled={disabledBtn}
          type="outline"
          onClick={addNewAppointment}
        />
      </div>
    </div>
  );
};

export default AddNewAppointment;
