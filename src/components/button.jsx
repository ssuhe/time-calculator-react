const COLOR_CLASSES = {
  primary:
    "hover:bg-blue-400 bg-blue-300 not-disabled:active:bg-blue-500 border-blue-500 text-blue-900 disabled:bg-blue-100",
  danger:
    "hover:bg-red-400 bg-red-300 not-disabled:active:bg-red-500 border-red-500 text-red-900 disabled:bg-red-100",
  success:
    "hover:bg-green-400 bg-green-300 not-disabled:active:bg-green-500 border-green-500 text-green-900 disabled:bg-green-100",
  warning:
    "hover:bg-yellow-400 bg-yellow-300 not-disabled:active:bg-yellow-500 border-yellow-500 text-yellow-900 disabled:bg-yellow-100",
};

const Button = ({ children, disabled, className, type, onClick }) => (
  <button
    className={`
        px-2
        cursor-pointer
        rounded
        border
        disabled:cursor-not-allowed
        disabled:text-gray-500
        ${COLOR_CLASSES[type] || COLOR_CLASSES.primary}
        ${className}
     `}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
