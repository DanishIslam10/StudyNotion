const { uploadMediaToCloudinary } = require('../utils/mediaUploader')
const SubSection = require('../model/SubSection')
const Section = require('../model/Section')
const Course = require('../model/Course')
require("dotenv").config()
const ffmpeg = require("fluent-ffmpeg")

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description } = req.body
        const { videoFile } = req.files

        //get video duration
        const getVideoDuration = async (videoUrl) => {
            return new Promise((resolve, reject) => {
                ffmpeg.ffprobe(videoUrl, (err, metadata) => {
                    if (err) {
                        return reject(err);
                    }
                    const duration = metadata.format.duration; // Duration in seconds
                    resolve(duration);
                });
            });
        };

        const requiredFields = { sectionId, title, description, videoFile }
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(402).json({
                    success: false,
                    message: `${key} is required.`
                })
            }
        }
        const videoFileDetails = await uploadMediaToCloudinary(videoFile, process.env.FOLDER_NAME)
        const videoUrl = videoFileDetails.secure_url

        const duration = await getVideoDuration(videoUrl)

        if(!duration) {
            return res.status(401).json({
                success:false,
                message:"Duration not calculated."
            })
        }

        console.log("Video Duration is: ",duration)

        const course = await Course.findOne({ courseContent: sectionId })

        //create entry in db
        const subSection = await SubSection.create({
            title,
            videoUrl,
            duration,
            description,
            section: sectionId,
            course: course._id,
        })
        //SubSection model is nested inside Section model , so we need to also update the Section model
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: subSection._id } },
            { new: true }
        ).populate("subSection").exec()

        const totalDuration = updatedSection.subSection.reduce((total, subSection) => {
            return total + subSection.duration
        }, 0)

        updatedSection.totalDuration = totalDuration
        await updatedSection.save()

        console.log("total duration of section: ", totalDuration)

        const updatedCourse = await Course.findOne({ courseContent: sectionId })
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    }
                }
            )
            .exec()

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Lecture Created"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Failed to create lecture. Please try again."
        })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, description } = req.body
        const videoFile = req.files ? req.files.videoFile : null //imp

        if (!subSectionId) {
            return res.status(402).json({
                success: false,
                message: "sub section id is missing"
            })
        }

        let updateData = {}
        if (title) updateData.title = title
        if (description) updateData.description = description
        if (videoFile) {
            const videoFileDetails = await uploadMediaToCloudinary(videoFile, process.env.FOLDER_NAME)
            updateData.videoUrl = videoFileDetails.secure_url
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            updateData,
            { new: true }
        )

        //find corresponding section
        const updatedSection = await Section.findOne({ subSection: updatedSubSection._id })
        //find corresponding course
        const updatedCourse = await Course.findOne({ courseContent: updatedSection._id })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Lecture Updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot Update Lecture"
        })
    }
}


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId } = req.body
        if (!subSectionId) {
            return res.status(401).json({
                success: false,
                message: "Sub Section id not provided"
            })
        }
        await SubSection.findByIdAndDelete(subSectionId)
        const updatedSection = await Section.findOneAndUpdate(
            { subSection: subSectionId },
            { $pull: { subSection: subSectionId } },
            { new: true }
        )
        const updatedCourse = await Course.findOne({ courseContent: updatedSection._id })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Sub section deleted"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Cannot delete sub section"
        })
    }
}