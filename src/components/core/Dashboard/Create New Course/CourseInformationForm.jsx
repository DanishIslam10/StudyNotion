import React, { useEffect, useState } from "react";
import { useCreateNewCourseInformation, useDeleteCourse, useGetAllCategoriesHook } from "../../../../services/operations/operations";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CourseThumbnail from "./CourseThumbnail";
import Btn from "../../../common/Btn";
import { setCourse, setStep } from "../../../../slices/newCourseSlice";

const CourseInformationForm = (props) => {

  const { editCourse, course } = useSelector((state) => state.newCourse)
  const [courseCategories, setCourseCategories] = useState();
  // console.log("Course information from newCourseSlice: ",course)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm();

  const getAllCategories = useGetAllCategoriesHook();
  const createNewCourseInformation = useCreateNewCourseInformation()
  const deleteCourse = useDeleteCourse()

  async function fetchCategories() {
    const response = await getAllCategories();
    setCourseCategories(response?.data?.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmitHandler = (data) => {
    // console.log("react form data: ", data); // Should log the form data, including the thumbnail
    createNewCourseInformation(data)
  };

  if (editCourse) {
    console.log("present data inside course when edit course is true : ", course)
    console.log("react form data when edit course is true before : ", getValues())
    setValue("courseName", course?.courseName);
    setValue("courseDescription", course?.courseDescription);
    setValue("price", course?.price);
    setValue("category", course?.category);
    setValue("tag", course?.tag);
    setValue("thumbnail", course?.thumbnail);
    setValue("whatWillYouLearn", course?.whatWillYouLearn);
    console.log("react form data when edit course is true after : ", getValues())
  }

  function updateCourseInformationHandler() {
    console.log("react from data on update click: ",getValues())
  }

  function cancelCourseCreationHandler() {
    reset()
    deleteCourse(course._id)
  }

  return (
    <div className="text-white m-4">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="new-course-info-form">
        <div>
          <label htmlFor="courseName">Course Title</label>
          <input
            type="text"
            id="courseName"
            placeholder="Enter Course Title"
            {...register("courseName", { required: true })}
            className="w-full"
          />
          {errors.courseName && <span>Course Title is required.</span>}
        </div>
        <div>
          <label htmlFor="courseDescription">Course Short Description</label>
          <textarea
            id="courseDescription"
            rows={4}
            placeholder="Enter Description"
            {...register("courseDescription", { required: true })}
            className="w-full"
          />
          {errors.courseDescription && <span>Description is required.</span>}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Enter Price"
            {...register("price", { required: true })}
            className="w-full"
          />
          {errors.price && <span>Price is required.</span>}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            defaultValue={""}
            {...register("category", { required: true })}
            className="w-full"
          >
            <option value="" disabled>Select</option>
            {courseCategories && courseCategories.map((category, index) => (
              <option value={category._id} key={index}>{category.name}</option>
            ))}
          </select>
          {errors.category && <span>Category is required</span>}
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            id="tag"
            {...register("tag", { required: true })}
            className="w-full"
          />
          {errors.tag && <span>Tag is required</span>}
        </div>

        {/* Pass register and setValue to CourseThumbnail */}
        <CourseThumbnail register={register} setValue={setValue} errors={errors} />

        <div>
          <label htmlFor="whatWillYouLearn" >Benefits of the course</label>
          <textarea
            rows={4}
            id="whatWillYouLearn"
            placeholder="Enter Benefits of the Course"
            {...register("whatWillYouLearn", { required: true })}
            className="w-full"
          />
          {
            errors.whatWillYouLearn && (
              <span>Enter the benefits</span>
            )
          } 
        </div>

        {
          editCourse ? (
            <div className="flex justify-end gap-2">
              <Btn onClickFunction={cancelCourseCreationHandler} children="Cancel" color="#161D29" textColor="#F1F2FF" />
              <Btn onClickFunction={updateCourseInformationHandler} children="Update" color="#FFD60A" textColor="#000814" />
            </div>
          ) : (
            <div className="flex justify-end">
              <Btn type="submit" children="Next" color="#FFD60A" textColor="#000814" />
            </div>
          )
        }
      </form >
    </div >
  );
};

export default CourseInformationForm;
