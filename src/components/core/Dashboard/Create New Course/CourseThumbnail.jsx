import React, { useEffect, useState } from "react"
import { VscCloudUpload } from "react-icons/vsc";
import Btn from "../../../common/Btn"
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../slices/newCourseSlice";

const CourseThumbnail = ({ register, setValue, errors }) => {

    const {editCourse,course} = useSelector((state) => state.newCourse)

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        register("thumbnail", { required: "thumbnail is required" })
    }, [register])

    useEffect(() => {
        setValue("thumbnail", selectedFile)
    }, [selectedFile, setValue])

    function fileChangeHandler(e) {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    function removeThumbnailPreview() {
        setPreviewUrl("")
        setSelectedFile(null)
        setValue("thumbnail",null)
        dispatch(setCourse({
            ...course,
            thumbnail:null,
        }))
    
    }

    return (
        <div>
            {
                previewUrl && !editCourse ? (
                    <div className="flex flex-col justify-center items-center bg-[#2C333F] my-2 py-4 rounded-md gap-2">
                        <div className="w-[70%] ">
                            <p className="text-sm font-[400]" >Uploaded Thumbnail:</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-[70%] " src={previewUrl} />
                        </div>
                        <div className="w-[70%]">
                            <p onClick={removeThumbnailPreview} className="text-sm text-[#f08686] font-[400] cursor-pointer hover:underline ">Remove Image</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <label htmlFor="thumbnail" >Course Thumbnail</label>
                        <input
                            type="file"
                            id="thumbnail"
                            className="hidden"
                            onChange={fileChangeHandler}
                        />
                        <label htmlFor="thumbnail" className="bg-[#2C333F] flex flex-col justify-center items-center gap-3 p-4 cursor-pointer rounded-md " >
                            <VscCloudUpload className="text-4xl text-[#FFD60A] bg-[#171717] p-2 rounded-full transition-all duration-200 hover:scale-110 " />
                            <div className="flex flex-col justify-center items-center text-[#999DAA] text-xs font-[400] ">
                                <p>Drag and drop an image, or Browse </p>
                                <p>Max 6MB each (12MB for videos)</p>
                            </div>
                            <div className="flex gap-8 items-center text-[#6E727F] text-xs font-[600]">
                                <p>Aspect ratio 16:9</p>
                                <p>Recommended size 1024x576</p>
                            </div>
                        </label>
                        {errors.thumbnail && (
                            <p className="text-[rgb(245,105,105)] text-xs mt-1">{errors.thumbnail.message}</p>
                        )}
                    </div>
                )
            }
            {/* {
              editCourse && (
                <div className="flex flex-col justify-center items-center bg-[#2C333F] my-2 py-4 rounded-md gap-2">
                        <div className="w-[70%] ">
                            <p className="text-sm font-[400]" >Uploaded Thumbnail:</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="w-[70%] " src={course?.thumbnail} />
                        </div>
                        <div className="w-[70%]">
                            <p onClick={removeThumbnailPreview} className="text-sm text-[#f08686] font-[400] cursor-pointer hover:underline ">Remove Image</p>
                        </div>
                    </div>
              )
            } */}
        </div>
    )
};

export default CourseThumbnail;
