import React from "react"

const Header = (props) => {
  return (
    <div className="flex flex-col gap-2 m-4">
                <div className="flex gap-2 text-sm font-[400] text-[#838894] ">
                    <NavLink to={"/"} >
                        <p>Home /</p>
                    </NavLink>
                    <NavLink to={"/dashboard/wishlist"}>
                        <p>Wishlist</p>
                    </NavLink>
                </div>
                <div>
                    <p className="text-3xl font-[500] text-[#F1F2FF] ">Wishlist</p>
                </div>
            </div>
  )
};

export default Header;
