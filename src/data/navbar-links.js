import { FaHome } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { RiInformation2Line } from "react-icons/ri";
import { IoCall } from "react-icons/io5";

export const NavbarLinks = [
  {
    title: "Home",
    path: "/",
    icon:<FaHome/>
  },
  {
    title: "Catalog",
    path: '/catalog',
    icon:<FaRegListAlt/>
  },
  {
    title: "About Us",
    path: "/about",
    icon:<RiInformation2Line/>
  },
  {
    title: "Contact Us",
    path: "/contact-us",
    icon:<IoCall/>
  },
];
