import React, { useEffect, useState } from "react";
import { useGetAllCategoriesHook, useGetAllCourses, useGetEnrolledCourses } from "../../services/operations/operations";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/core/HomePage/Footer";
import { setAllPublishedCourses } from "../../slices/catalogSlice";
import Spinner from "../.././components/common/Spinner"

const Catalog = () => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [catalogLinks, setCatalogLinks] = useState([]);
    const getAllCategories = useGetAllCategoriesHook();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { allPublishedCourses } = useSelector((state) => state.catalog)
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
        getAllCourses()
            .then((response) =>
                dispatch(
                    setAllPublishedCourses(response.data.data.filter((course) =>
                        course?.category === selectedCategory?._id && course?.status === "Published"))
                )
            )
            .catch((error) => console.log(error));
    }, [selectedCategory]);

    return (
        <div>
            {
                catalogLinks?.length > 0 &&
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-[#161D29] flex flex-col gap-4 p-4 sm:py-6 sm:px-16">
                        <div className="sm:flex items-center gap-2 bg-[#31363f] py-2 px-2 sm:w-fit rounded">
                            {catalogLinks?.map((category) => (
                                <div key={category._id}>
                                    <button
                                        type="button"
                                        className={`w-full rounded py-1 px-4 ${category._id === selectedCategory?._id
                                            ? "text-[#FFD60A] bg-[#151515]"
                                            : "text-[#939393]"
                                            }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        <p>{category.name}</p>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 w-[80%]">
                            <p className="text-3xl font-[500] text-[#F1F2FF]">{selectedCategory?.name}</p>
                            <p className="text-sm font-[400] text-[#999DAA]">{selectedCategory?.description}</p>
                        </div>
                    </div>
                    {/* Apply grid layout here */}
                    {
                        allPublishedCourses?.length === 0 ? (
                            <div className="flex w-full my-10 justify-center items-center my-auto">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4 mx-8">
                                {allPublishedCourses?.map((course, index) => (
                                    <CourseCard key={index} course={course} />
                                ))}
                            </div>
                        )
                    }
                    <Footer />
                </div>
            }
        </div>
    );
};

export default Catalog;
