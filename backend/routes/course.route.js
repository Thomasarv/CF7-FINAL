import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createCourse, createLecture, deleteCourse, editCourse, editLecture,  getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourse, removeLecture, togglePublishedCourse} from "../controllers/course.controller.js"
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
router.post('/:courseId/lecture/:lectureId', isAuthenticated, editLecture);
router.delete('/lecture/:lectureId', isAuthenticated, removeLecture);




export default router;