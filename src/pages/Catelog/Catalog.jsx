import React, { useEffect, useState } from "react";
import { useGetAllCategoriesHook, useGetAllCourses, useGetEnrolledCourses } from "../../services/operations/operations";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/core/HomePage/Footer";
import { setAllPublishedCourses, setCatalogLoading } from "../../slices/catalogSlice";
import Spinner from "../.././components/common/Spinner"

const Catalog = () => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [catalogLinks, setCatalogLinks] = useState([]);
    const getAllCategories = useGetAllCategoriesHook();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { allPublishedCourses, catalogLoading } = useSelector((state) => state.catalog);
    const dispatch = useDispatch();
    const getAllCourses = useGetAllCourses();
    const getEnrolledCourses = useGetEnrolledCourses()

    // console.log("all published courses: ",allPublishedCourses)

    useEffect(() => {
        token && user?.accountType === "Student" &&
            getEnrolledCourses()
    }, [])

    useEffect(() => {
        getAllCategories()
            .then((result) => {
                const categories = result.data.data;
                setCatalogLinks(categories);
                if (categories.length > 0) {
                    setSelectedCategory(categories[0]);
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, []);

    useEffect(() => {

        if (!selectedCategory?._id) return;

        const fetchCourses = async () => {

            dispatch(setCatalogLoading(true));

            try {

                const response = await getAllCourses();

                const filteredCourses = response?.data?.data?.filter(
                    (course) =>
                        course?.category === selectedCategory?._id &&
                        course?.status === "Published"
                );

                dispatch(setAllPublishedCourses(filteredCourses));

            } catch (error) {

                console.log(error);
                dispatch(setAllPublishedCourses([]));

            } finally {

                dispatch(setCatalogLoading(false));
            }
        };

        fetchCourses();

    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-[#000814] text-white">
            {catalogLinks?.length > 0 && (
                <div className="w-full">

                    {/* HEADER */}
                    <div className="border-b border-white/10 bg-[#0d1526]">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">

                            {/* CATEGORY TABS */}
                            <div className="flex flex-wrap items-center gap-2.5">
                                {catalogLinks?.map((category) => (
                                    <button
                                        key={category._id}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200
                  ${category._id === selectedCategory?._id
                                                ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] text-black shadow-lg"
                                                : "border border-white/10 bg-[#111c35] text-slate-400 hover:bg-[#152040] hover:text-white"
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {/* SELECTED CATEGORY INFO */}
                            <div className="max-w-3xl flex flex-col gap-3">

                                {/* BADGE */}
                                <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                    <p className="text-xs font-medium text-indigo-300">Browse category</p>
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                                    {selectedCategory?.name}
                                </h1>

                                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                                    {selectedCategory?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* COURSES SECTION */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

                        {catalogLoading ? (

                            <div className="flex min-h-[300px] items-center justify-center">
                                <Spinner />
                            </div>

                        ) : allPublishedCourses?.length === 0 ? (

                            <div className="flex min-h-[300px] flex-col items-center justify-center text-center gap-4">

                                {/* EMPTY STATE ICON */}
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
                                    <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white">No courses yet</h2>
                                    <p className="mt-1 text-slate-400 text-sm">
                                        Courses for this category are not available yet. Check back soon.
                                    </p>
                                </div>

                            </div>

                        ) : (

                            <>
                                {/* RESULTS COUNT */}
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="text-sm text-slate-500">
                                        Showing{" "}
                                        <span className="font-semibold text-slate-300">
                                            {allPublishedCourses?.length}
                                        </span>{" "}
                                        {allPublishedCourses?.length === 1 ? "course" : "courses"}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {allPublishedCourses?.map((course) => (
                                        <CourseCard key={course._id} course={course} />
                                    ))}
                                </div>
                            </>

                        )}
                    </div>

                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Catalog;
