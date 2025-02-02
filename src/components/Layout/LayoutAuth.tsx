import DarkMode from "@/ui/DarkMode";
import { ReactNode } from "react";
import Header from "../Header";

interface IProps {
  children: ReactNode;
}

const LayoutAuth = ({ children }: IProps) => {
  return (
    <DarkMode>
      <Header />
      {children}
    </DarkMode>
  );
};

export default LayoutAuth;
