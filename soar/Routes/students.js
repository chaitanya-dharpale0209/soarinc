
const express = require('express');
const router = express.Router();
const { createStudent, transferStudent, getStudentsBySchool, updateStudent, deleteStudent } = require('../Controllers/studentController');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/rolemiddleware');

router.post('/enroll', authMiddleware, roleMiddleware('schoolAdmin'), createStudent); // Only school admins can enroll students
router.post('/transfer', authMiddleware, roleMiddleware('schoolAdmin'), transferStudent); // Only school admins can transfer students
router.get('/', authMiddleware, roleMiddleware('schoolAdmin'), getStudentsBySchool); // Get all students for the school
router.put('/:studentId', authMiddleware, roleMiddleware('schoolAdmin'), updateStudent); // Update student details
router.delete('/:studentId', authMiddleware, roleMiddleware('schoolAdmin'), deleteStudent); // Delete student

module.exports = router;
