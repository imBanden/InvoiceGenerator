interface Props {
  label: string;
  placeholder: string;
  inputValue: (value: string) => void;
}

const Input = ({ label, placeholder, inputValue }: Props) => {
  const handleChange = (newValue: string) => {
    inputValue(newValue);
  };
  return (
    <div className={"label-input-container"}>
      <label className="my-company-form-labels">{label}</label>
      <input
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        className="my-company-form-inputs"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
