//on 'create course' page , it has field for 'category' , so we must create 'category'
// controller before we create 'course' controller

const Category = require('../model/Category')
const Course = require('../model/Course')

//writing create category api
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                messages: "all fields are required"
            })
        }
        console.log(`Name: ${name} Description: ${description}`)
        //create entry in db
        const categoryDetails = await Category.create({
            name,
            description,
        })
        console.log("Category Details: ",categoryDetails)
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error while creating Category"
        })
    }
}

//creating api to get all Categories
exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: true, description: true })
        //this will fetch entire doc in which name and description must be present
        res.status(200).json({
            success: true,
            data: allCategories,
            message: "all categories shown successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while showing all Category"
        })
    }
}

//get courses based on categories
exports.categoryPageDetails = async (req, res) => {
    try {
        //get category id
        const { categoryId } = req.body
        //get courses for specific category
        const selectedCategory = await Category.findById(categoryId)
            .populate("courses")
            .exec()
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "no courses found for this category"
            })
        }
        //get courses for difference category
        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        })
            .populate("course")
            .exec()

        //get top 10 selling courses (homework)
        //create a controller for contact us page (homework)
        // --> male the student that his message is recieved and mail the studynotion of data send my student
        //     in the contact us page

        //return success response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            },
            message: "Data fetch successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot fetch the courses based on categories"
        })
    }
}

//delete category
exports.deleteCategory = async (req,res) => {
    try {
        const {categoryId} = req.body
        if(!categoryId) {
            return res.status(400).json({
                success:false,
                message:"please provide category id"
            })
        }
        //first delete the course corresponding to this category
        await Course.deleteMany({category:categoryId})
        //delete the category
        await Category.findByIdAndDelete(categoryId)

        return res.status(200).json({
            success:true,
            message:"category is deleted successfully"
        })

    } catch (error) {
        
    }
}