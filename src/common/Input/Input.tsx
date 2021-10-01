const Input = (props: any) => {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        id={props.id}
        className={props.className}
        value={props.value}
        onChange={(e) => {
          props.setName(e.target.value);
        }}
      />
    </>
  );
};

export default Input;
