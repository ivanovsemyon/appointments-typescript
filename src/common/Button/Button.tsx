import { useMemo } from "react";

import cn from "classnames";

import "./Button.scss";

interface IPropsButton {
  label: string;
  disabled?: boolean;
  type: "outline" | "outline-small" | "primary";
  onClick?: () => void;
}

const Button = ({ label, disabled, type, onClick }: IPropsButton) => {
  const className = useMemo(() => {
    return cn("button", `button--${type}`, {
      "button--disabled": disabled,
    });
  }, [type, disabled]);

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
