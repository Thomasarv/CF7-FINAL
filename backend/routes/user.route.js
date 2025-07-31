import express from "express";
import { register, login, logout, updateProfile,deleteUser, enrollInCourse, unenrollFromCourse, getEnrolledCourses } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();
// AUTH ROUTES
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// USER PROFILE ROUTES
router.put('/profile/update', isAuthenticated, singleUpload, updateProfile);
router.delete('/profile/delete', isAuthenticated, deleteUser);

// COURSE ENROLLMENT ROUTES
router.post('/:userId/enroll/:courseId', enrollInCourse);
router.post('/:userId/unenroll/:courseId', unenrollFromCourse);
router.get('/:userId/enrolled', isAuthenticated, getEnrolledCourses);



export default router;
