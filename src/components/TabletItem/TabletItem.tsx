import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import Input from "common/Input";
import Modal from "common/Modal";

import { DatePicker, Select } from "antd";
import moment from "moment";

import { IAppointment } from "utils/interfaces/appointmentInterfaces";
import {
  changeAppointment,
  removeAppointment,
} from "utils/services/appointmentsService";

import pencil from "assets/icons/Pencil.svg";
import trash from "assets/icons/Trash.svg";
import arrow from "assets/icons/Arrow-bottom.svg";
import calendar from "assets/icons/Calendar.svg";

import style from "./TabletItem.module.scss";

const { Option } = Select;

interface ITabletItemProps {
  item: IAppointment;
  doctors: Array<string>;
}

const TabletItem = ({ item, doctors }: ITabletItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");

  const dispatch = useDispatch();

  const showModalDelete = useCallback(() => {
    setIsDeleting(true);
  }, [setIsDeleting]);

  const showModalEdit = useCallback(() => {
    setName(item.name);
    setDoctor(item.doctor);
    setDate(item.date);
    setComplaint(item.complaint);
    setIsEditing(true);
  }, [
    setIsEditing,
    setName,
    setDoctor,
    setDate,
    setComplaint,
    item.name,
    item.doctor,
    item.date,
    item.complaint,
  ]);

  const deleteAppointment = useCallback(() => {
    dispatch(removeAppointment(item._id));
    setIsDeleting(false);
  }, [item._id, dispatch, setIsDeleting]);

  const editAppointment = useCallback(() => {
    dispatch(
      changeAppointment({
        _id: item._id,
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
    );
    setIsEditing(false);
  }, [dispatch, item._id, name, doctor, date, complaint, setIsEditing]);

  return (
    <div className={style.tablet_row}>
      <div className={`${style.tablet_row_item} ${style.name}`}>
        {item.name}
      </div>
      <div className={`${style.tablet_row_item} ${style.doctor}`}>
        {item.doctor}
      </div>
      <div className={`${style.tablet_row_item} ${style.date}`}>
        {item.date}
      </div>
      <div className={`${style.tablet_row_item} ${style.complaint}`}>
        {item.complaint}
      </div>
      <div className={style.tablet_row_item_button_wrapper}>
        <button
          className={style.tablet_row_item_button}
          onClick={showModalDelete}
        >
          <img src={trash} alt="trash" />
        </button>
        <button
          className={style.tablet_row_item_button}
          onClick={showModalEdit}
        >
          <img src={pencil} alt="pencil" />
        </button>
      </div>
      {isDeleting && (
        <Modal
          header="Удалить приём"
          onClickCancel={() => setIsDeleting(false)}
          buttonLabel="Delete"
          onClickAction={deleteAppointment}
        >
          <p className="modal_appointment_text">
            Вы действительно хотите удалить прием?
          </p>
        </Modal>
      )}
      {isEditing && (
        <Modal
          header="Изменить прием"
          onClickCancel={() => setIsEditing(false)}
          buttonLabel="Save"
          onClickAction={editAppointment}
        >
          <div className="modal_edit_appointment_form">
            <div className="modal_delete_appointment_input_wrapper">
              <Input
                label="Имя:"
                value={name}
                className="modal_edit_appointment_form_input"
                setName={setName}
                id="name"
              />
              <label>Врач:</label>
              <Select
                className="modal-edit-appointment-select"
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
              <label>Дата:</label>
              <DatePicker
                className="modal-edit-appointment-datepicker"
                defaultValue={moment(date, "YYYY-MM-DD")}
                suffixIcon={<img src={calendar} alt="calendar" />}
                placeholder=""
                onChange={(date, dateStr) => setDate(dateStr)}
              />
              <label>Жалобы:</label>
              <textarea
                className="modal_edit_appointment_form_input complaint_input"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TabletItem;
