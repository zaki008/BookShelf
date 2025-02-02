import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const MainUI = ({ children }: IProps) => {
  return (
    <div className="h-full text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col translate-all duration-300 mt-14 dark:bg-gray-800">
      {children}
    </div>
  );
};

export default MainUI;
