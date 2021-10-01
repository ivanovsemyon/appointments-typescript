import Button from "common/Button";

import "./Modal.scss";

const Modal = (props: any) => {
  return (
    <div className="modal_appointment_wrapper">
      <div className="modal_appointment">
        <h3 className="modal_appointment_header">{props.header}</h3>
        {props.children}
        <div className="modal_appointment_btn_wrapper">
          <Button
            type="outline-small"
            label="Cancel"
            onClick={props.onClickCancel}
          />
          <Button
            type="primary"
            label={props.buttonLabel}
            onClick={props.onClickAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
