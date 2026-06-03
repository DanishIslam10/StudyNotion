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
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.25)]">

      {/* Gradient Top Border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>

      <div className="mx-auto flex h-[78px] w-[92%] max-w-7xl items-center justify-between gap-4">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">

          {/* MOBILE MENU */}
          <button
            onClick={showSideBarHandler}
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300"
          >
            <RxHamburgerMenu
              className="text-2xl text-white transition-transform duration-300 group-hover:scale-110"
            />
          </button>

          {/* LOGO */}
          <Link to={"/"} className="group">
            <img
              src={Logo}
              className="w-32 sm:w-36 transition-all duration-300 group-hover:scale-[1.03]"
              alt="Logo"
            />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-2">

          {NavbarLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300
            ${isActive
                  ? "bg-indigo-500/15 text-white border border-indigo-400/20"
                  : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                }`
              }
            >
              {/* ICON */}
              <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                {link.icon}
              </span>

              {/* TITLE */}
              <span>{link.title}</span>

              {/* ACTIVE GLOW */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5"></div>
            </NavLink>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">

          {/* AUTH BUTTONS */}
          {token === null && (
            <div className="flex items-center gap-3">

              {/* LOGIN */}
              <Link to={"/login"}>
                <button
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#E5E7EB]
              backdrop-blur-lg transition-all duration-300 hover:bg-white/10 hover:border-indigo-400/30 hover:text-white"
                >
                  Log in
                </button>
              </Link>

              {/* SIGNUP */}
              <Link to={"/signup"}>
                <button
                  className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/30"
                >
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
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300"
              >
                <LuShoppingCart className="text-2xl text-[#E2E8F0] transition-transform duration-300 group-hover:scale-110" />
              </Link>

              {/* CART COUNT */}
              {cart?.length > 0 && (
                <div
                  className="
      absolute -right-2 -top-2
      flex h-6 min-w-[24px] items-center justify-center
      rounded-full border border-white/20
      bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
      px-1.5 text-[11px] font-bold text-black
      shadow-lg shadow-orange-500/30
      backdrop-blur-md
      transition-all duration-300
      animate-pulse
    "
                >
                  {cart?.length}
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {token !== null && (
            <div className="ml-1">
              <ProfileDropDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
