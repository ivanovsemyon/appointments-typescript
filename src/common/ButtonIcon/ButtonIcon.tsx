import "./Button.scss";

const ButtonIcon = ({
  iconSrc,
  onClick,
}: {
  iconSrc: string;
  onClick: () => void;
}) => {
  return (
    <button className="button-icon" onClick={onClick}>
      <img src={iconSrc} alt="" />
    </button>
  );
};

export default ButtonIcon;
