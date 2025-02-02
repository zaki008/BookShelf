import { links } from "@/constants";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import LinkItem from "./LinkItem";

interface IProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: IProps) => {
  const { isLogin, userData } = useSelector((state: RootState) => state.auth);
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {isLogin && userData && (
            <li>
              <div className="block md:hidden mr-5 border-gray-700 dark:border-gray-400 border-2 border-r rounded-full px-5 py-1 font-bold text-gray-700 dark:text-gray-400">
                <span>{userData.name}</span>
              </div>
            </li>
          )}
          {links.map((link, index) => {
            return <LinkItem key={index} {...link} />;
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
