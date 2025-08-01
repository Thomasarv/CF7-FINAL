import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createCourse,  getCreatorCourses, getPublishedCourse,  togglePublishedCourse} from "../controllers/course.controller.js"


const router = express.Router()

// PUBLIC/PUBLISHED COURSE ROUTES
router.get('/published-courses', getPublishedCourse);
router.patch('/:courseId', togglePublishedCourse); // toggle published status

// COURSE MANAGEMENT ROUTES (creator/admin actions)
router.post('/', isAuthenticated, createCourse);
router.get('/', isAuthenticated, getCreatorCourses);




export default router;