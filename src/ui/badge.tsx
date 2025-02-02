interface IProps {
  status: string;
}

const Badge = ({ status }: IProps) => {
  const baseClasses = "text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm";

  const statusBadge = (status: string) => {
    if (status === "completed") {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-xl";
    }
    if (status === "unread") {
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-xl";
    }
    return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 rounded-xl";
  };
  return (
    <span className={`${baseClasses} ${statusBadge(status)}`}>{status}</span>
  );
};

export default Badge;
