import Title from "@/ui/Title";
import { FiSend } from "react-icons/fi";

const Balance = () => {
  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1">
      <div className="flex justify-between items-center">
        <Title>Balance</Title>
        <FiSend className="bg-gray-500 p-2 rounded-full text-gray-300 w-8 h-8" />
      </div>
      <div>
        <h1 className="font-bold text-2xl">
          $600,00 <span className="font-medium text-xl">(USD)</span>
        </h1>
        <span>on July 2024</span>
      </div>
    </div>
  );
};

export default Balance;
