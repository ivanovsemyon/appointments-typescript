import "./IconButton.scss";

const IconButton = ({
  iconSrc,
  onClick,
}: {
  iconSrc: string;
  onClick: () => void;
}) => (
  <button className="button-icon" onClick={onClick}>
    <img src={iconSrc} alt="" />
  </button>
);

export default IconButton;
