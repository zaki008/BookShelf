import { FaBook, FaBookOpen, FaChartBar, FaCheckCircle } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import { IoIosLogOut, IoIosSettings, IoIosStats } from "react-icons/io";

export const links = [
  {
    href: "/",
    icon: FaChartBar,
    text: "Dashboard",
  },
  {
    href: "#",
    icon: IoIosLogOut,
    text: "Logout",
  },
];

export const bookData = [
  {
    name: "total",
    title: "Total Buku",
    icon: FaBook,
    count: 8,
    bgColor: "bg-gray-100",
  },
  {
    name: "currently",
    title: "Sedang Dibaca",
    icon: FaBookOpen,
    count: 2,
    bgColor: "bg-gray-100",
  },
  {
    name: "finish",
    title: "Selesai Dibaca",
    icon: FaCheckCircle,
    count: 3,
    bgColor: "bg-gray-100",
  },
];

export const categoryBook = [
  { value: "technology", label: "Technology" },
  { value: "fantasy", label: "Fantasy" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "horror", label: "Horror" },
  { value: "adventure", label: "Adventure" },
  { value: "philosophy", label: "Philosophy" },
];

export const bookStatus = [
  { value: "completed", label: "Completed" },
  { value: "read", label: "Read" },
  { value: "unread", label: "Unread" },
];

export const shortcutLink = [
  {
    title: "Goals",
    icon: GoGoal,
  },
  {
    title: "Plan",
    icon: GrPlan,
  },
  {
    title: "Stats",
    icon: IoIosStats,
  },
  {
    title: "Setting",
    icon: IoIosSettings,
  },
];
