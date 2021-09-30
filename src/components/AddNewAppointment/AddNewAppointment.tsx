import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DatePicker, Select } from "antd";

import Button from "common/Button";

import { createAppointment } from "utils/services/appointmentsService";
import { IState } from "utils/interfaces/appointmentInterfaces";

import arrow from "assets/icons/Arrow-bottom.svg";
import calendar from "assets/icons/Calendar.svg";

import style from "./AddingNewAppointment.module.scss";

const { Option } = Select;

const AddingNewAppointment = () => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");

  const dispatch = useDispatch();
  const doctors = useSelector(
    (state: { appointmentsReducer: IState }) =>
      state.appointmentsReducer.doctors
  );

  const addNewAppointment = useCallback(() => {
    if (name && doctor && date && complaint) {
      dispatch(
        createAppointment({
          name: name.trim(),
          doctor: doctor.trim(),
          date: date.trim(),
          complaint: complaint.trim(),
        })
      );
      setName("");
      setDoctor("");
      setComplaint("");
    }
  }, [name, doctor, date, complaint, dispatch]);

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
      <Button
        label="Добавить"
        disabled={!name || !doctor || !date || !complaint}
        type="outline"
        onClick={addNewAppointment}
      />
    </div>
  );
};

export default AddingNewAppointment;
