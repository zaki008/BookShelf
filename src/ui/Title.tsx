import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  type?: string;
}

const Title = ({ children, type }: IProps) => {
  if (type === "form") {
    return (
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {children}
      </h5>
    );
  }
  return (
    <h2 className="font-bold text-gray-700 text-2xl dark:text-gray-400">
      {children}
    </h2>
  );
};

export default Title;
