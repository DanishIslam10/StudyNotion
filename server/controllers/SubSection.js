const {uploadMediaToCloudinary} = require('../utils/mediaUploader')
const SubSection = require('../model/SubSection')
const Section = require('../model/Section')
require("dotenv").config()

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description, timeDuration } = req.body
        const { videoFile } = req.files
        if (!sectionId || !title || !description || !timeDuration || !videoFile) {
            return res.status(401).json({
                success: false,
                message: "all data is required"
            })
        }
        const videoFileDetails = await uploadMediaToCloudinary(videoFile, process.env.FOLDER_NAME)
        //create entry in db
        const subSection = await SubSection.create({
            title,
            videoUrl: videoFileDetails.secure_url,
            description,
            timeDuration,
            section:sectionId
        })
        //SubSection model is nested inside Section model , so we need to also update the Section model
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: subSection._id} },
            { new: true }
        )
        .populate("subSection")
        .exec()

        return res.status(200).json({
            success:true,
            data:subSection,
            message:"subsection created and section updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Cannot create sub section"
        })
    }
}

exports.updateSubSection = async (req,res) => {
    try {
        const {subSectionId,title,description,timeDuration} = req.body
        const videoFile = req.files ? req.files.videoFile : null //imp

        let updateData = {}
        if(title) updateData.title = title
        if(description) updateData.description = description
        if(timeDuration) updateData.timeDuration = timeDuration
        if(videoFile) {
            const videoFileDetails = await uploadMediaToCloudinary(videoFile,process.env.FOLDER_NAME)
            updateData.videoUrl = videoFileDetails.secure_url
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            updateData,
            {new:true}
        )

        return res.status(200).json({
            success:true,
            data:updatedSubSection,
            message:"subsection is updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot update sub section"
        })
    }
}


exports.deleteSubSection = async (req,res) => {
    try {
        const {subSectionId} = req.body
        if(!subSectionId) {
            return res.status(401).json({
                success:false,
                message:"Sub Section id not provided"
            })
        }
        await SubSection.findByIdAndDelete(subSectionId)
        await Section.findOneAndUpdate(
            {subSection:subSectionId},
            {$pull : {subSection : subSectionId}},
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"Sub section deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Cannot delete sub section"
        })
    }
}