import { postLogout } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useDispatch } from "react-redux";
interface Badge {
  text: string;
  color: string;
  darkColor: string;
}

interface IProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  badge?: Badge;
}

const LinkItem = ({ href, icon: Icon, text, badge }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(postLogout());
  };
  return (
    <li>
      <Link
        onClick={text === "Logout" ? handleLogout : undefined}
        href={text === "Logout" ? "#" : href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Icon className="mr-2" />
        <span className="flex-1 me-3">{text}</span>
        {badge && (
          <span
            className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${badge.color} ${badge.darkColor}`}
          >
            {badge.text}
          </span>
        )}
      </Link>
    </li>
  );
};

export default LinkItem;
