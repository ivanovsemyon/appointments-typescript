interface input {
  label: string;
  className: string;
  value: string;
  setName: (e: string) => void;
  id: string;
}

const Input = ({ label, className, value, setName, id }: input) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        className={className}
        value={value}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </>
  );
};

export default Input;
