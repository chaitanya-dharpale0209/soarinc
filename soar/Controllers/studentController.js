
const Student = require('../Models/Students');
const schoolValidationSchema = require('../Models/SchoolValidator'); 
const studentValidationSchema = require('../Models/studentValidation');
const roleMiddleware = require('../Middleware/rolemiddleware');


const createStudent = async (req, res) => {
    const { name, email, schoolId } = req.body;

    try {
        const { error } = studentValidationSchema.validate({ name, email, schoolId });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const student = new Student({ name, email, schoolId });
        await student.save();
        res.status(201).json({ message: 'Student enrolled successfully', student });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


const transferStudent = async (req, res) => {
    const { studentId, transferToSchoolId } = req.body;

    try {
        const { error } = studentValidationSchema.validate({ transferToSchoolId });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Check if the logged-in user has the correct schoolId to transfer the student
        if (student.schoolId.toString() !== req.user.schoolId.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot transfer student from different school' });
        }

        student.status = 'transferred';
        student.transferToSchoolId = transferToSchoolId;
        await student.save();
        
        res.status(200).json({ message: 'Student transferred successfully', student });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getStudentsBySchool = async (req, res) => {
    try {
        const students = await Student.find({ schoolId: req.user.schoolId });
        res.status(200).json({ students });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


const updateStudent = async (req, res) => {
    const { studentId } = req.params;
    const { name, email } = req.body;

    try {
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        
        if (student.schoolId.toString() !== req.user.schoolId.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        student.name = name || student.name;
        student.email = email || student.email;
        await student.save();

        res.status(200).json({ message: 'Student details updated successfully', student });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        
        if (student.schoolId.toString() !== req.user.schoolId.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await student.remove();
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    createStudent,
    transferStudent,
    getStudentsBySchool,
    updateStudent,
    deleteStudent,
};
