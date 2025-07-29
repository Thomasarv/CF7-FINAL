import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle:{  type:String, required:true },
    subTitle: {type:String},
    description:{type:String},
    category:{ type:String, required:true },
    courseLevel:{ type:String, enum:['Beginner', "Intermediate", "Expert"]},
    coursePrice:{ type:Number, min:0, default:0 },
    courseThumbnail:{ type:String},
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isPublished:{ type:Boolean, default:false },
    starRating: { type: Number, min:0, max:5, default:0, },
    reviewCount: {  type: Number,},
    oldPrice: { type: Number, min: 0, default: 0,},
    features: { type: String, },
    whatYouWillLearn: { type: String, },
    requirements: {type: String,},
    targetAudience: { type: String, default: '',},
},{timestamps:true})

export const Course = mongoose.model("Course", courseSchema)