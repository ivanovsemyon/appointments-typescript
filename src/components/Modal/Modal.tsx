import Button from "common/Button";

import style from "./Modal.module.scss";

const Modal = () => {
  return (
    <div className={style.modal_appointment_wrapper}>
      <div className={style.modal_appointment}>
        <h3 className={style.modal_appointment_header}>{}</h3>
        <div className={style.modal_appointment_btn_wrapper}>
          <Button type="outline-small" label="Cancel" onClick={() => {}} />
          <Button type="primary" label="Delete" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
