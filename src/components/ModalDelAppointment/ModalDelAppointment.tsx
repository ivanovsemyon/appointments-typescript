import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch } from "react-redux";

import { removeAppointment } from "../../redux/appointmentSlice";
import Button from "../Button/Button";

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
            height="40px"
            border="2px solid rgba(0, 0, 0, 0.2)"
            fontSize="18px"
            margin="0 12px 0 0"
            onClick={() => setIsDeleting(false)}
          />
          <Button
            label="Delete"
            height="40px"
            border="2px solid rgba(197, 233, 255, 0.72)"
            background="rgba(197, 233, 255, 0.72)"
            fontSize="18px"
            margin="0 12px 0 0"
            onClick={deleteAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalDelAppointment;
