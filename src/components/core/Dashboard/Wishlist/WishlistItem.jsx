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
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1526]
  transition-all duration-300 hover:border-indigo-500/20 hover:bg-[#111c35]">

            <div className="flex flex-col sm:flex-row gap-4 p-4">

                {/* THUMBNAIL */}
                <div className="relative sm:w-[220px] shrink-0 overflow-hidden rounded-2xl border border-white/10">
                    <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-[160px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526]/80 to-transparent" />

                    {/* Rating badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0d1526]/80 px-2.5 py-1 backdrop-blur-sm">
                        <p className="text-xs font-bold text-[#a6ff5e]">3.5</p>
                        <StarRatings
                            rating={3.5}
                            starRatedColor="#a6ff5e"
                            numberOfStars={5}
                            name="rating"
                            starDimension="10px"
                            starSpacing="1px"
                        />
                        <p className="text-[10px] text-slate-500">(10k)</p>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col justify-between gap-4">

                    {/* TOP */}
                    <div className="flex flex-col gap-3">

                        {/* Title row */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1 min-w-0">

                                {/* Category badge */}
                                <div className="flex w-fit items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5">
                                    <div className="h-1 w-1 rounded-full bg-indigo-400" />
                                    <p className="text-[10px] font-medium text-indigo-300">Premium Course</p>
                                </div>

                                <h2 className="cursor-pointer text-base sm:text-lg font-bold tracking-tight text-white
              transition-colors duration-200 hover:text-transparent
              hover:bg-gradient-to-r hover:from-[#ecec07] hover:via-[#a6ff5e] hover:to-[#ffbc57]
              hover:bg-clip-text leading-snug">
                                    {course?.courseName}
                                </h2>
                            </div>

                            {/* Desktop remove */}
                            <button
                                onClick={removeItemHandler}
                                className="hidden sm:flex items-center gap-2 rounded-xl border border-red-500/20
              bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 shrink-0
              transition-all duration-200 hover:bg-red-500/20 hover:text-red-300"
                            >
                                <RiDeleteBin6Line />
                                Remove
                            </button>
                        </div>

                        {/* Description */}
                        <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-500">
                            {course?.courseDescription}
                        </p>

                        {/* Instructor */}
                        <div className="flex items-center gap-2.5">
                            <img
                                src={course?.instructor?.image || "default-avatar.jpg"}
                                alt="Instructor"
                                className="h-8 w-8 rounded-full border border-white/10 object-cover object-top"
                            />
                            <div>
                                <p className="text-[10px] text-slate-600">Instructor</p>
                                <p className="text-xs font-semibold text-slate-300">
                                    {course?.instructor?.firstName}{" "}
                                    {course?.instructor?.lastName}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">

                        {/* Price */}
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Price</p>
                            <p className="mt-0.5 text-xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                                ₹{course?.price || "499"}
                            </p>
                        </div>

                        {/* Mobile remove */}
                        <button
                            onClick={removeItemHandler}
                            className="flex sm:hidden items-center gap-2 rounded-xl border border-red-500/20
            bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400
            transition-all duration-200 hover:bg-red-500/20 hover:text-red-300"
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
