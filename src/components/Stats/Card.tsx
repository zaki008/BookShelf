import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface countProps {
  totalBook: number;
  complatedBook: number;
  unReadBook: number;
  countReadBook: number;
}

interface IProps {
  data: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    count: number;
    bgColor: string;
    name: string;
  };
  count: countProps;
}

const colorIcon = (name: string, darkMode: boolean) => {
  if (name === "currently") {
    return darkMode ? "text-yellow-500" : "text-yellow-700";
  }
  if (name === "finish") {
    return darkMode ? "text-green-500" : "text-green-700";
  }
  return darkMode ? "text-blue-500" : "text-blue-700";
};

const Card = ({ data, count }: IProps) => {
  const { darkMode } = useSelector((state: RootState) => state.global);

  const countCondition = (name: string, count: countProps) => {
    if (name === "total") {
      return count.totalBook;
    }
    if (name === "currently") {
      return count.countReadBook;
    }
    if (name === "finish") {
      return count.complatedBook;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400 w-full">
      <span
        className={`${data.bgColor} px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}
      >
        <data.icon className={`text-4xl ${colorIcon(data.name, darkMode)}`} />
      </span>
      <div>
        <p className="font-bold">{data.title}</p>
        <h2 className="text-xl">
          <span className="text-2xl font-bold">
            {countCondition(data.name, count)}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Card;
