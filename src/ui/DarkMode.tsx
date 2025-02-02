import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface IProps {
  children: ReactNode;
}

const DarkMode = ({ children }: IProps) => {
  const { darkMode } = useSelector((state: RootState) => state.global);
  return <div className={`${darkMode && "dark"}`}>{children}</div>;
};

export default DarkMode;
