import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch } from "react-redux";

import Button from "common/Button";

import { removeAppointment } from "utils/services/appointmentsService";

import style from "./ModalDelAppointment.module.scss";

interface IPropsModalDel {
  id: string;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

const ModalDelAppointment = ({ id, setIsDeleting }: IPropsModalDel) => {
  const dispatch = useDispatch();

  const deleteAppointment = useCallback(() => {
    dispatch(removeAppointment(id));
    setIsDeleting(false);
  }, [id, dispatch, setIsDeleting]);

  return (
    <div className={style.modal_delete_appointment_wrapper}>
      <div className={style.modal_delete_appointment}>
        <h3 className={style.modal_delete_appointment_header}>Удалить приём</h3>
        <p className={style.modal_delete_appointment_text}>
          Вы действительно хотите удалить прием?
        </p>
        <div className={style.modal_delete_appointment_btn_wrapper}>
          <Button
            label="Cancel"
            type="outline-small"
            onClick={() => setIsDeleting(false)}
          />
          <Button label="Delete" type="primary" onClick={deleteAppointment} />
        </div>
      </div>
    </div>
  );
};

export default ModalDelAppointment;
