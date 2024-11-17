import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const VideoUpload = ({ register, setValue, errors }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        register("videoFile", { required: "Video file is required." });
    }, [register]);

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("video")) {
            setValue("videoFile", file);  // Update form with selected file

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);  // Set preview URL for video
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid video file.");
        }
    };

    function removeVideoFile() {
        setPreviewUrl("")
        setValue("videoFile", null)
    }

    return (
        <div>
            {previewUrl ? (
                <div className="flex flex-col justify-center items-center">
                    <p
                        onClick={removeVideoFile}
                        className="text-[#f58787] text-sm font-[400] my-2 cursor-pointer hover:underline w-fit ">
                        Remove Video
                    </p>
                    <video className="mx-auto" src={previewUrl} controls width="400" />
                </div>
            ) : (
                <div>
                    <label
                        htmlFor="videoFile"
                        className="bg-[#424854] flex flex-col justify-center items-center gap-3 p-4 cursor-pointer rounded-md"
                    >
                        <IoCloudUploadOutline className="text-4xl text-[#042E3B] bg-[#E2E2E2] p-2 rounded-full transition-all duration-200 hover:scale-110" />
                        <div className="flex flex-col justify-center items-center text-[#999DAA] text-xs font-[400]">
                            <p>Drag and drop a video, or Browse</p>
                            <p>Max 12MB for videos</p>
                        </div>
                        <div className="flex gap-8 items-center text-[#6E727F] text-xs font-[600]">
                            <p>Aspect ratio 16:9</p>
                            <p>Recommended size 1024x576</p>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="videoFile"
                        accept="video/*"
                        onChange={fileChangeHandler}
                        className="hidden"
                    />
                    {errors.videoFile && (
                        <span className="text-red-500 text-xs">
                            {errors.videoFile.message}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
