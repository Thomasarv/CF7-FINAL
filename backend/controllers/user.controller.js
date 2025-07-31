import { User } from "../models/user.model.js";
import  {Course} from "../models/course.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";



export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

       if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        // generate token
        const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn: "1d"} )
        return res.cookie('token', token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
            message: `Welcome back ${user.name}`,
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        })
    }
}




export const logout = async(__, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Logout"
        })
    }
}


export const updateProfile = async(req, res) => {
    try {
        const userId = req.userId; 
        const { name, description } = req.body;
        const file = req.file;

        let cloudResponse = null;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // updating data
        if (name) user.name = name;
        if (description) user.description = description;
        if (cloudResponse) user.photoUrl = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};


export const deleteUser = async (req, res) => {
  try {
       const userId = req.userId; 
    await User.findByIdAndDelete(userId);


    res.status(200).json({ success: true, message: 'User account deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error, please try again later.' });
  }
};





export const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    console.log('Enroll request:', { userId, courseId });

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      console.log('Course not found');
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!Array.isArray(user.enrolledCourses)) {
      console.log('enrolledCourses is not an array:', user.enrolledCourses);
      user.enrolledCourses = [];
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'User already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ success: true, message: 'User enrolled successfully', updatedUser: user });

  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const unenrollFromCourse = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if enrolled
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'User is not enrolled in this course' });
    }

    // Remove the courseId from enrolledCourses array
    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id.toString() !== courseId
    );

    await user.save();

    res.status(200).json({ success: true, message: 'User unenrolled successfully', updatedUser: user });
  } catch (error) {
    console.error('Unenroll error:', error);
    res.status(500).json({ success:false , message: 'Internal server error' });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user and populate enrolledCourses
    const user = await User.findById(userId).populate('enrolledCourses');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, courses: user.enrolledCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
