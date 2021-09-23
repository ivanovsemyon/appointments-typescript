import style from "./Button.module.scss";

interface IPropsButton {
  className?: string;
  label?: string;
  height?: string;
  border?: string;
  background?: string;
  fontSize?: string;
  margin?: string;
  disabled?: boolean;
  onClick?: any;
}

const Button = ({
  className,
  label,
  height,
  border = "1px solid rgba(0, 0, 0, 0.2)",
  background = "#ffffff",
  fontSize,
  margin,
  disabled,
  onClick,
}: IPropsButton) => {
  const styleProps = {
    height: height,
    border: border,
    background: background,
    fontSize: fontSize,
    margin: margin,
  };

  return (
    <button
      style={styleProps}
      className={`${style.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
