import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { RxHamburgerMenu } from "react-icons/rx";
import { setShowSideBar } from "../../slices/profileSlice";

const Navbar = (props) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { showSideBar } = useSelector((state) => state.profile)

  function showSideBarHandler() {
    dispatch(setShowSideBar(!showSideBar))
  }

  return (
    <div
      className="w-full flex justify-center items-center shadow-[0px_0px_5px_0px_rgba(255,255,255,1)] py-4 
    sm:shadow-[0px_0px_1px_0px_rgba(255,255,255,1)] z-30 "
    >
      <div className="sm:w-[80%] w-[90%] flex justify-between items-center gap-5">
        {
          
          <RxHamburgerMenu
            onClick={showSideBarHandler}
            className="text-[white] text-2xl md:hidden cursor-pointer 
        transition-all duration-150 hover:scale-110 " />
        }
        <Link to={"/"}>
          <img src={Logo} className="w-36"></img>
        </Link>
        <div className="hidden md:flex gap-4 font-[600] text-[rgba(153,157,170,1)] ">
          {NavbarLinks.map((link, index) => {
            return (
              <div key={index}>
                <NavLink to={link.path}>
                  <div className="flex gap-1 items-center">
                    {link.icon}
                    <p> {link.title} </p>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 sm:gap-4 text-[rgba(153,157,170,1)] ">
          {token === null && (
            <>
              <Link to={"/login"}>
                <button className="bg-[rgba(22,29,41,1)] py-1 px-2 rounded-md border-[1px] border-[#464646] w-max ">
                  Log in
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-[rgba(22,29,41,1)] py-1 px-2 rounded-md border-[1px] border-[#464646] w-max">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {user && user?.accountType != "Instructor" && (
            <div className="relative flex justify-center items-center mx-5 ">
              <Link to={"/profile/wishlist"}>
                <LuShoppingCart className="text-2xl" />
              </Link>
              <p className="flex absolute bottom-5 left-[25px] text-[#ffffff] bg-[#15ce2b] 
              px-[6px] rounded-full text-sm " >
                {cart.length > 0 && cart.length}
              </p>
            </div>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
