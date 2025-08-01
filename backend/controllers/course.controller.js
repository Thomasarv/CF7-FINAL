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



export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId).populate("creator", "name photoUrl description");

      

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course",
      success: false
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      starRating,
      reviewCount,
      oldPrice,
      targetAudience,
      features,
      requirements,
      whatYouWillLearn,
    } = req.body

    const courseId = req.params.courseId

    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' })
    }

    // Update basic fields
    course.courseTitle = courseTitle ?? course.courseTitle
    course.subTitle = subTitle ?? course.subTitle
    course.description = description ?? course.description
    course.category = category ?? course.category
    course.courseLevel = courseLevel ?? course.courseLevel
    course.coursePrice = coursePrice ?? course.coursePrice
    course.starRating = starRating ?? course.starRating
    course.reviewCount = reviewCount ?? course.reviewCount
    course.oldPrice = oldPrice ?? course.oldPrice
    course.targetAudience = targetAudience ?? course.targetAudience
    course.features = features ?? course.features
    course.requirements = requirements ?? course.requirements
    course.whatYouWillLearn = whatYouWillLearn ?? course.whatYouWillLearn

    // Handle thumbnail if uploaded
    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'course_thumbnails' },
            (error, result) => {
              if (result) {
                resolve(result)
              } else {
                reject(error)
              }
            }
          )
          streamifier.createReadStream(req.file.buffer).pipe(stream)
        })

      const result = await streamUpload()
      course.courseThumbnail = result.secure_url
    }

    await course.save()

    res.status(200).json({ success: true, message: 'Course updated', course })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}


export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;  
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete course." });
  }
};

