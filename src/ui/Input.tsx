interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}

const Input = ({ title, error, ...props }: IProps) => {
  return (
    <div className="mb-3 w-full">
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <input
        {...props} // Spread semua properti ke elemen input
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          props.className || ""
        }`}
      />
      {error && (
        <label className="block mt-1 text-xs font-medium text-red-700 dark:text-red-500">
          {error}
        </label>
      )}
    </div>
  );
};

export default Input;
