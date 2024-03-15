interface InputProps {
  value?: string;
  onChange?: (value: any, event?: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  id = "",
  style = {},
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value, event);
    }
  };
  return (
    <input
      type={type}
      id={id}
      className={`rounded-md p-2 w-full 
        border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange ? handleChange : undefined}
      style={style}
    />
  );
};

export default Input;
