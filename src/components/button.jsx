const Button = ({ children, className, type, onClick }) => {
  const _types = {
    primary: "blue",
    danger: "red",
    success: "green",
    warning: "yellow",
  };
  const color = _types[type] || _types.primary

  return (
    <button
      className={`
        px-2
        cursor-pointer
        rounded
        border
        hover:bg-${color}-400
        bg-${color}-300
        active:bg-${color}-500
        border-${color}-500
        text-${color}-900
        ${className}
     `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
