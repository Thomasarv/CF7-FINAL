import express from "express"

import {  getPublishedCourse, togglePublishedCourse } from "../controllers/course.controller.js"


const router = express.Router()

// PUBLIC/PUBLISHED COURSE ROUTES
router.get('/published-courses', getPublishedCourse);
router.patch('/:courseId', togglePublishedCourse); // toggle published status





export default router;