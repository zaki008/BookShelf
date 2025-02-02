import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Content = ({ children }: IProps) => {
  return (
    <div className="flex-1 flex flex-col pb-5 min-h-[90vh]">{children}</div>
  );
};

export default Content;
