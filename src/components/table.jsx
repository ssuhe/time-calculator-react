const Table = ({ header = [], rows = [], emptyText = "No records." }) => {
  return (
    <table>
      <thead>
        <tr>
          {header.map((h, k) => (
            <th key={k}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((r, i) => (
            <tr key={i}>
              {header.map((h, j) => {
                return (
                  <td key={j}>{(h.render && h.render(r, i, j)) || r[h.key]}</td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={header.length}>{emptyText}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
