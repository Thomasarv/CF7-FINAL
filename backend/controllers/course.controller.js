import { Course } from "../models/course.model.js";



export const getPublishedCourse = async(_, res)=>{
    try {
        const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl description"})
        if(!courses){
            return res.status(404).json({
               success:false,
                message:"Course not found"
            })
        }
        return res.status(200).json({
            success:true,
            courses,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to get course",
            success:false
        })
    }
}

export const togglePublishedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; // expecting 'true' or 'false'

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    if (publish === 'true') course.isPublished = true;
    else if (publish === 'false') course.isPublished = false;
    else course.isPublished = !course.isPublished; // fallback toggle

    await course.save();

    return res.status(200).json({
      success: true,
      message: `Course is now ${course.isPublished ? "published" : "unpublished"}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update course status" });
  }
};

export const createCourse = async(req, res)=> {
    try {
        const {courseTitle, category} = req.body;
        if(!courseTitle || !category){
            return res.status(400).json({
                message:"Course title and category is required",
                success:false
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        })
        return res.status(201).json({
            success:true,
            course,
            message:"Course created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to create course",
            success:false
        })
    }
}

export const getCreatorCourses = async (req, res)=>{
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId}).populate('lectures');
        if(!courses){
            return res.status(404).json({
                message:"Course not found",
                courses:[],
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            courses,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to get course",
            success:false
        })
    }
}
