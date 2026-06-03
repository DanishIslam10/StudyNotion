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
            {
                catalogLinks?.length > 0 && (
                    <div className="w-full">

                        {/* Header Section */}
                        <div className="bg-[#161D29] border-b border-[#2C333F]">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">

                                {/* Category Tabs */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {catalogLinks?.map((category) => (
                                        <button
                                            key={category._id}
                                            type="button"
                                            className={`rounded-md px-5 py-2 text-sm font-medium transition-all duration-200
                                    
                                    ${category._id === selectedCategory?._id
                                                    ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] text-[#000814]"
                                                    : "bg-[#2C333F] text-[#C5C7D4] hover:bg-[#3E4653]"
                                                }`}
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Selected Category Details */}
                                <div className="max-w-3xl flex flex-col gap-3">
                                    <h1 className="text-3xl sm:text-4xl font-semibold text-[#F1F2FF]">
                                        {selectedCategory?.name}
                                    </h1>

                                    <p className="text-sm sm:text-base text-[#999DAA] leading-relaxed">
                                        {selectedCategory?.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Courses Section */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                            {
                                catalogLoading ? (

                                    <div className="flex justify-center items-center min-h-[300px]">
                                        <Spinner />
                                    </div>

                                ) : allPublishedCourses?.length === 0 ? (

                                    <div className="flex flex-col justify-center items-center min-h-[300px] text-center">

                                        <h2 className="text-2xl font-semibold text-white">
                                            No Courses Found
                                        </h2>

                                        <p className="text-[#999DAA] mt-2">
                                            Courses for this category are not available yet.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                                        {
                                            allPublishedCourses?.map((course) => (
                                                <CourseCard
                                                    key={course._id}
                                                    course={course}
                                                />
                                            ))
                                        }

                                    </div>

                                )
                            }

                        </div>

                        {/* Footer */}
                        <Footer />
                    </div>
                )
            }
        </div>
    );
};

export default Catalog;
