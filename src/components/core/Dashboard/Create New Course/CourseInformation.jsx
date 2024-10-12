import React, { useEffect, useState } from "react"
import { LuUploadCloud } from "react-icons/lu";
import Btn from "../../../common/Btn";
import { useNavigate } from "react-router";
import CourseTips from "../../../common/CourseTips";
import toast from "react-hot-toast";

const CourseInformation = (props) => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    price: "",
    category: "",
    tag: "",
    thumbnail: null,
    whatWillYouLearn: "",
  })

  function formDataChangeHandler(event) {
    const { name, value, files } = event.target;

    // Check if it's a file input
    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Save the first file from the file input
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  function formSubmitHandler(event) {
    event.preventDefault()
    console.log("New Course Information: ", formData)
    navigate("/profile/instructor-courses/create-new-course/course-builder")
  }

  const [savedNewCourseInformation,setSavedNewCourseInformation] = useState()

  useEffect(() => {
    setSavedNewCourseInformation(localStorage.getItem("New Course Data")
      ? JSON.parse(localStorage.getItem("New Course Data"))
      : null)
    console.log(savedNewCourseInformation)
  }, [])

  const courseName = savedNewCourseInformation?.courseName
  const courseDescription = savedNewCourseInformation?.courseDescription
  const price = savedNewCourseInformation?.price
  const category = savedNewCourseInformation?.category
  const tag = savedNewCourseInformation?.tag
  const whatWillYouLearn = savedNewCourseInformation?.whatWillYouLearn

  function saveInformationToLocalStorage() {
    localStorage.setItem("New Course Data", JSON.stringify(formData))
    toast.success("Course Information Saved")
  }

  return (
    <div className="flex gap-4 justify-center m-4">
      <form onSubmit={formSubmitHandler} className="new-course-information-form w-[70%] flex flex-col gap-2">
        <div className="flex flex-col gap-4 bg-[#161D29] p-4 rounded-md " >
          <div>
            <p>Course Title</p>
            <input
              type="text"
              required={true}
              placeholder="Enter Course Detail"
              name="courseName"
              value={courseName ? (courseName) :  formData.courseName}
              onChange={formDataChangeHandler}
            />
          </div>
          <div>
            <p>Course Short Description</p>
            <textarea
              rows={4}
              maxLength={100}
              required={true}
              placeholder="Enter Description"
              name="courseDescription"
              value={ courseDescription ? (courseDescription) : formData.courseDescription}
              onChange={formDataChangeHandler}
            />
          </div>
          <div>
            <p>Price</p>
            <input
              type="text"
              required={true}
              placeholder="Enter Price"
              name="price"
              value={price ? (price) : formData.price}
              onChange={formDataChangeHandler}
            />
          </div>
          <div>
            <p>Category</p>
            <select
              required={true}
              name="category"
              value={formData.category}
              onChange={formDataChangeHandler}
            >
              {
                category && 
                <option selected > {category} </option> 
              }
              <option>
                Select
              </option>
              <option>
                <p>Web Development</p>
              </option>
              <option>
                <p>AI and ML</p>
              </option>
            </select>
          </div>
          <div>
            <p>Tags</p>
            <input
              type="text"
              required={true}
              placeholder="Choose a Tag"
              name="tag"
              value={tag ? (tag) : formData.tag}
              onChange={formDataChangeHandler}
            />
          </div>
          <div>
            <p>Course Thumbnail</p>
            <div className="flex flex-col justify-center items-center bg-[#2C333F] min-h-[20vh] rounded-md p-5 ">
              <div className="w-[40%] flex flex-col justify-center items-center gap-2 text-center">
                <label htmlFor="thumbnail" className="text-[#FFD60A] bg-[#171717] p-2 rounded-full text-2xl cursor-pointer
              transition-all duration-150 hover:scale-110 ">
                  <LuUploadCloud />
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={formDataChangeHandler}
                  className="hidden"
                />
                <div>
                  <h6 className="text-xs font-[400] text-[#999DAA] ">Drag and drop an image, or Browse
                    Max 6MB each (12MB for videos)</h6>
                </div>
              </div>
              <div className="flex gap-4 text-sm font-[600] text-[#6E727F] ">
                <h6>Aspect ratio 16:9</h6>
                <h6>Recommended size 1024x576</h6>
              </div>
            </div>
          </div>
          <div>
            <p>Benefits of the Courses</p>
            <textarea
              rows={4}
              maxLength={100}
              required={true}
              placeholder="Enter Benefits of the Course"
              name="whatWillYouLearn"
              value={whatWillYouLearn ? (whatWillYouLearn) : formData.whatWillYouLearn}
              onChange={formDataChangeHandler}
            />
          </div>
          <div className="w-fit">
            <Btn children="Save" color="#FFD60A" textColor="#000814"
              onClickFunction={saveInformationToLocalStorage} />
          </div>
        </div>
        <div className="flex justify-end">
          <Btn children="Next" color="#FFD60A" textColor="#000814" />
        </div>
      </form>
      <div className="w-[30%] " >
        <CourseTips />
      </div>
    </div>
  )
};

export default CourseInformation;