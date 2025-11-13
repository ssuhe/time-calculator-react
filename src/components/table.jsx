const Table = ({ header = [], rows = [], emptyText = "No records." }) => (
  <table className="border-separate border-spacing-0">
    <thead className="bg-blue-200 border-b sticky top-0">
      <tr>
        {header.map((h, k) => (
          <th
            className={`p-2 text-left border-t border-b 
                ${k === 0 && "border-l"}
                ${k === header.length - 1 && "border-r"}
              `}
            key={k}
          >
            {h.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.length > 0 ? (
        rows.map((r, i) => (
          <tr className="hover:bg-amber-100 has-focus:bg-amber-200" key={i}>
            {header.map((h, j) => {
              return (
                <td
                  className={`
                      p-1 ${h.className}
                      ${j === 0 && "border-l"}
                      ${j === header.length - 1 && "border-r"}
                      border-b
                    `}
                  key={j}
                >
                  {(h.render && h.render(r, i, j)) || r[h.key]}
                </td>
              );
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td
            className="p-1 text-left border border-t-0"
            colSpan={header.length}
          >
            {emptyText}
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Table;
