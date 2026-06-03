import StarRatings from "react-star-ratings";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import toast from "react-hot-toast";
// import { setCourseDetails } from "../../../../slices/catalogSlice";

const WishlistItem = ({ course }) => {

    const dispatch = useDispatch()

    function removeItemHandler() {
        dispatch(removeFromCart(course._id))
        toast.success("Item Removed")
    }

    // function seeDetails() {
    //     dispatch(setCourseDetails(course))
    //     navigate("/catalog/course-details")
    // }

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#161D29]/70 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#1b2433] hover:shadow-2xl hover:shadow-black/20">

            <div className="flex flex-col gap-4 sm:flex-row">

                {/* Thumbnail */}
                <div className="relative sm:w-[240px] overflow-hidden rounded-xl">
                    <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-[170px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md">
                        <p className="text-sm font-semibold text-yellow-300">
                            3.5
                        </p>

                        <StarRatings
                            rating={3.5}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name="rating"
                            starDimension="12px"
                            starSpacing="1px"
                        />

                        <p className="text-xs text-[#CBD5E1]">
                            (10k)
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between gap-5">

                    {/* Top */}
                    <div className="flex flex-col gap-3">

                        {/* Title + Remove */}
                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <h2
                                    className="cursor-pointer text-xl font-bold tracking-tight text-white transition-colors hover:text-yellow-300"
                                // onClick={seeDetails}
                                >
                                    {course?.courseName}
                                </h2>

                                <p className="mt-1 text-sm text-[#838894]">
                                    Premium Development Course
                                </p>
                            </div>

                            {/* Desktop Remove */}
                            <button
                                onClick={removeItemHandler}
                                className="hidden items-center gap-2 rounded-xl border border-[#EF476F]/20 bg-[#EF476F]/10 px-4 py-2 text-sm font-medium text-[#FF7B94] transition-all duration-300 hover:scale-105 hover:bg-[#EF476F]/20 sm:flex"
                            >
                                <RiDeleteBin6Line />
                                Remove
                            </button>
                        </div>

                        {/* Description */}
                        <p className="line-clamp-2 text-sm leading-6 text-[#AAB0C0]">
                            {course?.courseDescription}
                        </p>

                        {/* Instructor */}
                        <div className="flex items-center gap-3 pt-1">

                            <img
                                src={course?.instructor?.image || "default-avatar.jpg"}
                                className="h-10 w-10 rounded-full border border-white/10 object-cover object-top"
                                alt="Instructor"
                            />

                            <div>
                                <p className="text-sm text-[#838894]">
                                    Instructor
                                </p>

                                <p className="font-medium text-white">
                                    {course?.instructor?.firstName}{" "}
                                    {course?.instructor?.lastName}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between">

                        {/* Price */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-[#838894]">
                                Price
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-yellow-300">
                                ₹ {course?.price || "499"}
                            </h3>
                        </div>

                        {/* Mobile Remove */}
                        <button
                            onClick={removeItemHandler}
                            className="flex items-center gap-2 rounded-xl border border-[#EF476F]/20 bg-[#EF476F]/10 px-4 py-2 text-sm font-medium text-[#FF7B94] transition-all duration-300 hover:scale-105 hover:bg-[#EF476F]/20 sm:hidden"
                        >
                            <RiDeleteBin6Line />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WishlistItem;
