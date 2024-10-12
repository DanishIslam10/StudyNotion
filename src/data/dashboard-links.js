import { FaRegUser } from "react-icons/fa6";
import { GoStack } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { LuBookmark } from "react-icons/lu";
import { MdLaptopChromebook } from "react-icons/md";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/profile/my-profile",
    type: ["Student", "Instructor"],
    icon: <FaRegUser />
  },
  {
    id: 2,
    name: "Enrolled Courses",
    path: "/profile/enrolled-courses",
    type: ["Student"],
    icon: <GoStack />
  },
  {
    id: 3,
    name: "Wishlist",
    path: "/profile/wishlist",
    type: ["Student"],
    icon: <LuBookmark />
  },
  {
    id: 4,
    name: "Purchase History",
    path: "/profile/purchase-history",
    type: ["Student"],
    icon: <IoCartOutline />
  },
  {
    id: 5,
    name: "My Courses",
    path: "/profile/instructor-courses",
    type: ["Instructor"],
    icon: <MdLaptopChromebook />
  },
];
