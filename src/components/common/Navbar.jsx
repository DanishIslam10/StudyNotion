import Logo from "../../assets/Logo/LearnSpace.png";
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
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.25)]">

      {/* Gradient Top Border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

      <div className="mx-auto flex h-[62px] md:h-[78px] w-full px-4 sm:px-6 max-w-7xl items-center justify-between gap-3">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">

          {/* MOBILE MENU */}
          <button
            onClick={showSideBarHandler}
            className="group flex-shrink-0 flex h-9 w-9 md:hidden items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300"
          >
            <RxHamburgerMenu className="text-xl text-white transition-transform duration-300 group-hover:scale-110" />
          </button>

          {/* LOGO */}
          <Link to={"/"} className="group flex-shrink-0">
            <img
              src={Logo}
              className="w-32 sm:w-36 md:w-44 lg:w-52 transition-all duration-300 group-hover:scale-[1.03]"
              alt="Logo"
            />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {NavbarLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 rounded-xl px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-300
            ${isActive
                  ? "bg-indigo-500/15 text-white border border-indigo-400/20"
                  : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="text-base lg:text-lg transition-transform duration-300 group-hover:scale-110">
                {link.icon}
              </span>
              <span className="hidden lg:inline">{link.title}</span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5" />
            </NavLink>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          {/* AUTH BUTTONS */}
          {token === null && (
            <div className="flex items-center gap-2">
              {/* LOGIN — hidden on very small screens */}
              <Link to={"/login"}>
                <button className="rounded-xl border border-white/10 bg-white/5 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-[#E5E7EB] backdrop-blur-lg transition-all duration-300 hover:bg-white/10 hover:border-indigo-400/30 hover:text-white whitespace-nowrap">
                  Log in
                </button>
              </Link>

              {/* SIGNUP */}
              <Link to={"/signup"}>
                <button className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/30 whitespace-nowrap">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* CART */}
          {user && user?.accountType !== "Instructor" && (
            <div className="relative">
              <Link
                to={"/profile/wishlist"}
                className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300"
              >
                <LuShoppingCart className="text-lg sm:text-xl text-[#E2E8F0] transition-transform duration-300 group-hover:scale-110" />
              </Link>

              {cart?.length > 0 && (
                <div className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] px-1 text-[10px] font-bold text-black shadow-lg shadow-orange-500/30 animate-pulse">
                  {cart?.length}
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {token !== null && (
            <div className="ml-0.5">
              <ProfileDropDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
