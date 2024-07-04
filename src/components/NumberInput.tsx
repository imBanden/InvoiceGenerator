interface Props {
  label: string;
  placeholder: string;
  inputValue: (value: number) => void;
}
const NumberInput = ({ label, placeholder, inputValue }: Props) => {
  // const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (newNum: string) => {
    if (!newNum) {
      newNum = "0.00";
    }
    inputValue(parseFloat(newNum));
  };
  return (
    <div className={"label-input-container"}>
      <label className="my-company-form-labels">{label}</label>
      <input
        type="number"
        step="any"
        onChange={(event) => handleChange(event.target.value)}
        className="my-company-form-inputs"
        placeholder={placeholder}
      />
    </div>
  );
};

export default NumberInput;
