import React, { useState } from "react"
import Btn from "../../../common/Btn";
import { FiPlusCircle } from "react-icons/fi";
import CourseTips from "../../../common/CourseTips";

const CourseBuilder = (props) => {

   const [sectionName,setSectionName] = useState("")
   const [courseId,setCourseId] = useState("")

    return (
        <div className="w-[90%] flex justify-between gap-4 p-4">
            <form className="course-builder-form w-[60%] bg-[#161D29] p-4 rounded-md h-fit ">
                <div className="flex flex-col gap-4">
                    <p>Course Builder</p>
                    <input
                        type="text"
                        required={true}
                        placeholder="Add a section to build your course"
                        name="sectionName"
                        value={sectionName}
                        onChange={(event) => setSectionName(event.target.value)}
                    />
                    <Btn
                        textColor="#FFD60A"
                        style={{
                            border: "1px solid #FFD60A",  // Proper border styling
                            display: "flex",              // Flexbox layout
                            flexDirection: "row",         // Align items in a row
                            gap: "5px",                   // Proper gap between flex items
                        }}
                    >
                        <FiPlusCircle />
                        <h6>Create Section</h6>
                    </Btn>
                </div>
            </form>
            <div className="w-[40%] ">
                <CourseTips />
            </div>
        </div>
    )
};

export default CourseBuilder;
