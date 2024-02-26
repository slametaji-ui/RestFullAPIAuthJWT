import express from "express";
import { GetUsers, Login, Logout, Register } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getAttendance, getAttendanceByUserIdAndDate, postAttendance } from "../controllers/Attendance.js";

const router = express.Router();

router.get('/users', verifyToken, GetUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/attendance', verifyToken, getAttendance);
router.get('/verify-attendance', verifyToken, getAttendanceByUserIdAndDate);
router.post('/post-attendance', verifyToken, postAttendance);


export default router;