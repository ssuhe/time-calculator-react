const Input = ({ type = "text", value = "", onChange, max, min }) => {
  return (
    <input value={value} onChange={onChange} max={max} min={min} type={type} />
  );
};

const TimeInput = ({ value = "", onChange, max, min }) => {
  return (
    <Input type="time" value={value} onChange={onChange} max={max} min={min} />
  );
};

export { TimeInput, Input };
