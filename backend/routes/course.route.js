import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createCourse,  deleteCourse, editCourse,   getCourseById,  getCreatorCourses, getPublishedCourse, togglePublishedCourse , getCourseLecture, createLecture} from "../controllers/course.controller.js"
import { singleUpload } from "../middleware/multer.js"

const router = express.Router()

// PUBLIC/PUBLISHED COURSE ROUTES
router.get('/published-courses', getPublishedCourse);
router.patch('/:courseId', togglePublishedCourse); // toggle published status

// COURSE MANAGEMENT ROUTES (creator/admin actions)
router.post('/', isAuthenticated, createCourse);
router.get('/', isAuthenticated, getCreatorCourses);
router.get('/:courseId', isAuthenticated, getCourseById);
router.put('/:courseId', isAuthenticated, singleUpload, editCourse);
router.delete('/:courseId', isAuthenticated, deleteCourse);

// LECTURE MANAGEMENT ROUTES
router.get('/:courseId/lecture', isAuthenticated, getCourseLecture);
router.post('/:courseId/lecture', isAuthenticated, createLecture);




export default router;