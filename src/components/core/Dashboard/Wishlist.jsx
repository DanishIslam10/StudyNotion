import React from "react"
import { NavLink } from "react-router-dom";

const Wishlist = (props) => {
    return (
        <div>
            <div className="flex flex-col gap-2 m-4">
                <div className="flex gap-2 text-sm font-[400] text-[#838894] ">
                    <NavLink to={"/"} >
                        <p>Home /</p>
                    </NavLink>
                    <NavLink to={"/profile/wishlist"}>
                        <p>Wishlist</p>
                    </NavLink>
                </div>
                <div>
                    <p className="text-3xl font-[500] text-[#F1F2FF] ">Wishlist</p>
                </div>
            </div>

        </div>
    )
};

export default Wishlist;
