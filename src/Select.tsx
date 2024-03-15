import React from "react";
import { Input } from ".";

interface SelectPRops {
  value?: string | number | null | undefined;
  onChange?: (value: any, label?: any) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  data?: { value: string | number; label: string }[];
  size?: "xs" | "sm" | "md" | "lg";
}
const Select: React.FC<SelectPRops> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  id = "",
  style = {},
  data = [],
  size = "md",
}) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);

  const handleClouse = () => {
    setOpen(false);
    setSearch("");
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (value: string | number, label: string) => {
    if (inputRef.current) inputRef.current.value = label;
    handleClouse();
    if (onChange) {
      onChange(value, label);
    }
  };

  React.useEffect(() => {
    function handleClickOutside(event: any) {
      // Validamos si el click fue fuera del input y del contenedor de opciones
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        handleClouse();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  React.useEffect(() => {
    if (value) {
      const item = data.find((item) => item.value === value);
      if (item) {
        if (inputRef.current) inputRef.current.value = item.label;
      }
    }
  }, [value, data]);
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const sizeClasses: any = {
    xs: "p-1 text-xs",
    sm: "p-1 text-sm",
    md: "p-2 text-md",
    lg: "p-2 text-lg",
  };
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        readOnly
        className={`rounded-md w-full 
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${sizeClasses[size]}
        ${className}`}
        placeholder={placeholder}
        onClick={handleOpen}
        style={style}
        ref={inputRef}
      />
      {open && (
        <div
          className=" absolute bg-white w-full border border-gray-300 rounded-md z-10"
          style={{ top: "100%", left: 0 }}
          ref={optionsRef}
        >
          <Input
            type="text"
            placeholder="Search..."
            className="p-2 border-b border-gray-300 rounded-t-md w-full"
            onChange={handleSearch}
          />
          {data
            .filter(
              (item) =>
                item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .map((item) => (
              <div
                key={item.value}
                // className="p-2 hover:bg-gray-100"
                className={` hover:bg-gray-100 ${sizeClasses[size]}`}
                onClick={() => handleChange(item.value, item.label)}
              >
                {item.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Select;
