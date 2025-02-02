"use client";
import Content from "@/ui/Content";
import DarkMode from "@/ui/DarkMode";
import MainUI from "@/ui/MainUI";
import { ReactNode, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

interface IProps {
  children: ReactNode;
}

const LayoutDashboard = ({ children }: IProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toogleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <DarkMode>
      <Header toogleSidebar={toogleSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} />
      <MainUI>
        <Content>{children}</Content>
      </MainUI>
    </DarkMode>
  );
};

export default LayoutDashboard;
