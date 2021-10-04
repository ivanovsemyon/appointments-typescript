import cn from "classnames";

import "./Button.scss";

interface IPropsButton {
  label: string;
  disabled?: boolean;
  type: "outline" | "outline-small" | "primary";
  onClick?: () => void;
}

const Button = ({ label, disabled, type, onClick }: IPropsButton) => {
  const className = cn("button", `button--${type}`, {
    "button--disabled": disabled,
  });

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
