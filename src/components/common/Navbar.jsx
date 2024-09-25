import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

import { categories } from "../../services/apis";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useGetAllCategoriesHook } from "../../services/operations/operations";

const Navbar = (props) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  const [catalogLinks, setCatalogLinks] = useState([]);

  const getAllCategories = useGetAllCategoriesHook()

  useEffect(() => {
    getAllCategories()
      .then((result) => {
        setCatalogLinks(result.data.data)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
  }, []);

  return (
    <div
      className="w-full flex justify-center items-center shadow-[0px_0px_5px_0px_rgba(255,255,255,1)] py-4 
    sm:shadow-[0px_0px_1px_0px_rgba(255,255,255,1)] "
    >
      <div className="sm:w-[80%] flex sm:justify-between items-center gap-5">
        <Link to={"/"}>
          <img src={Logo} className="w-36"></img>
        </Link>
        <div className="md:flex hidden gap-4 font-[600] text-[rgba(153,157,170,1)] ">
          {NavbarLinks.map((link,index) => {
            return (
              <div key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex justify-center  items-center group relative">
                    <p className="cursor-pointer"> {link.title} </p>
                    <RiArrowDropDownLine className="text-2xl" />
                    <div
                      className="invisible flex flex-col absolute left-[-4vw] top-6 w-max bg-[#e1dede] text-black py-1 px-4 mt-2 
                    rounded-md transition-all duration-200 group-hover:visible">
                      {catalogLinks.map((category,index) => (
                        <Link key={index} to={`${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                          className="cursor-pointer my-2 bg-[#1d2632] py-1 px-2 rounded-md text-[rgba(153,157,170,1)] 
                        text-center hover:bg-[#121a24]">
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink to={link.path}>
                    <p> {link.title} </p>
                  </NavLink>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 sm:gap-4 text-[rgba(153,157,170,1)] ">
          {token === null && (
            <>
              <Link to={"/login"}>
                <button className="bg-[rgba(22,29,41,1)] py-1 px-2 rounded-md border-[1px] border-[#464646] ">
                  Log in
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-[rgba(22,29,41,1)] py-1 px-2 rounded-md border-[1px] border-[#464646]">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {user && user?.accountType != "Instructor" && (
            <div className="flex justify-center items-center gap-2">
              <IoSearch className="text-xl" />
              <Link to={"/dashboard/cart"}>
                <LuShoppingCart className="text-xl" />
              </Link>
            </div>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
