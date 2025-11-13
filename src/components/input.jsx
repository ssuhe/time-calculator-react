const Input = ({ type = "text", value = "", onChange, max, min }) => (
  <input
    className="border focus:outline-blue-900 px-1 w-full rounded"
    value={value}
    onChange={onChange}
    max={max}
    min={min}
    type={type}
  />
);

const TimeInput = ({ value = "", onChange, max, min }) => (
  <Input type="time" value={value} onChange={onChange} max={max} min={min} />
);

export { TimeInput, Input };
