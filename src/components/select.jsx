const JobSelect = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((o, k) => (
        <option key={k} value={k}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default JobSelect;
