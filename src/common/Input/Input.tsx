import style from "./Input.module.scss";

interface input {
  type: "text" | "password";
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  id: string;
}

const Input = ({ type, label, placeholder, value, setValue, id }: input) => (
  <>
    <label htmlFor={id} className={style.label}>
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      className={style.input}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  </>
);

export default Input;
