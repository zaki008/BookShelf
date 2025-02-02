import React from "react";

interface Option {
  value: string;
  label: string;
}

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  title?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  error?: string;
  containerClassName?: string;
}

const Select = ({
  title,
  id,
  options,
  placeholder,
  error,
  className = "",
  containerClassName = "",
  onChange,
  ...props
}: IProps) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </label>
      )}
      <select
        id={id}
        className={` bg-gray-50 border focus:border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${className}`}
        onChange={onChange}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <label className="block text-xs font-medium text-red-700 dark:text-red-500">
          {error}
        </label>
      )}
    </div>
  );
};

export default Select;
