const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/rolemiddleware');
const Classroom = require('../Models/Classroom');
const classroomValidationSchema = require('../Models/ClassroomValidator');
const router = express.Router();


router.post('/createclassrooms', authMiddleware, roleMiddleware('schoolAdmin'), async (req, res) => {
    const { error } = classroomValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { name, capacity, resources, schoolId } = req.body;
        const classroom = new Classroom({ name, capacity, resources, schoolId });
        await classroom.save();
        res.status(201).json({ message: 'Classroom created successfully', classroom });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/getallclassrooms', authMiddleware, roleMiddleware('superAdmin', 'schoolAdmin'), async (req, res) => {
    try {
        // superAdmin: get all classrooms
        //schoolAdmin: filter by schoolId
        const classrooms = req.user.role === 'superAdmin'
            ? await Classroom.find()
            : await Classroom.find({ schoolId: req.user.schoolId });

        res.status(200).json(classrooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/getclassbyid/:id', authMiddleware, roleMiddleware('superAdmin', 'schoolAdmin'), async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);

        if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

      
        if (req.user.role === 'schoolAdmin' && classroom.schoolId.toString() !== req.user.schoolId.toString()) {
            return res.status(403).json({ message: 'You do not have access to this classroom' });
        }

        res.status(200).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/updateclassroom/:id', authMiddleware, roleMiddleware('superAdmin', 'schoolAdmin'), async (req, res) => {
    const { error } = classroomValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const classroom = await Classroom.findById(req.params.id);

        if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

       
        if (req.user.role === 'schoolAdmin' && classroom.schoolId.toString() !== req.user.schoolId.toString()) {
            return res.status(403).json({ message: 'You do not have access to update this classroom' });
        }

        const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Classroom updated successfully', updatedClassroom });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/deleteclassroom/:id', authMiddleware, roleMiddleware('superAdmin', 'schoolAdmin'), async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);

        if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

   
        if (req.user.role === 'schoolAdmin' && classroom.schoolId.toString() !== req.user.schoolId.toString()) {
            return res.status(403).json({ message: 'You do not have access to delete this classroom' });
        }

        await classroom.remove();
        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
