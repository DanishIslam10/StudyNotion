const Course = require("../model/Course")
const Section = require("../model/Section")
const SubSection = require("../model/SubSection")

exports.createSection = async (req, res) => {
    try {

        const { sectionName, courseId } = req.body
        //we can obtain sectionName and courseId from UI 

        if (!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "all data is required"
            })
        }

        //create entry in db
        const section = await Section.create({
            sectionName,
        })
        //section is nested inside Course model so we also need to update (insert) the Course model
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: section._id } },
            { new: true }
        )
            .populate("courseContent")
            .exec()

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Section created and Course updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Cannot create section, please try again later"
        })
    }
}

exports.updateSection = async (req, res) => {
    try {
        const { newSectionName, sectionId } = req.body

        if (!newSectionName || !sectionId) {
            return res.status(401).json({
                success: false,
                message: "all data is required"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $set: { sectionName: newSectionName} },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "Section is updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Cannot Update Section"
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.body
        if (!sectionId) {
            return res.status(401).json({
                success: false,
                message: "all data is required"
            })
        }
        //first delete the sub section corresponding to this section
        await SubSection.deleteMany({section : sectionId})
        await Section.findByIdAndDelete(sectionId)
        //update the course
        await Course.findOneAndUpdate(
            {courseContent:sectionId},
            {$pull : {courseContent : sectionId}}
        )
        return res.status(200).json({
            success: true,
            message: "Section Deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Cannot Delete Section"
        })
    }
}