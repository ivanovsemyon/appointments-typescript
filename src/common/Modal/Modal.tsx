import Button from "common/Button";

import "./Modal.scss";

interface modal {
  header: string;
  children: JSX.Element;
  onClickCancel: () => void;
  buttonLabel: string;
  onClickAction: () => void;
}

const Modal = ({
  header,
  children,
  onClickCancel,
  buttonLabel,
  onClickAction,
}: modal) => {
  return (
    <div className="modal_appointment_wrapper">
      <div className="modal_appointment">
        <h3 className="modal_appointment_header">{header}</h3>
        {children}
        <div className="modal_appointment_btn_wrapper">
          <Button type="outline-small" label="Cancel" onClick={onClickCancel} />
          <Button type="primary" label={buttonLabel} onClick={onClickAction} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
