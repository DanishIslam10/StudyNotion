import React from "react"

const CourseTips = (props) => {
  return (
    <div className="flex flex-col gap-2 bg-[#161D29] p-4 h-fit rounded-md ">
      <div>
        <p className="text-lg font-[600] text-[#F1F2FF] ">⚡Course Upload Tips</p>
      </div>
      <div className="text-xs font-[500] text-[#F1F2FF] ">
        <ul>
          <li className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>Set the Course Price option or make it free.</span>
          </li>
          <li className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>Standard size for the course thumbnail is 1024x576.</span>
          </li>
          <li className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>Video section controls the course overview video.</span>
          </li>
          <li className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>Course Builder is where you create & organize a course.</span>
          </li>
          <li className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</span>
          </li>
          <li className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>Information from the Additional Data section shows up on the course single page.</span>
          </li>
          <li className="flex items-start mb-2">
            <span className="mr-2">•</span>
            <span>
              Make Announcements to notify any important notes to all enrolled students at once.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default CourseTips;
