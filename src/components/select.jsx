const JobSelect = ({ options, value, onChange }) => (
  <select
    className="border w-full rounded px-1"
    value={value}
    onChange={onChange}
  >
    {options.map((o, k) => (
      <option key={k} value={k}>
        {o}
      </option>
    ))}
  </select>
);

export default JobSelect;
