const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const rolemiddleware = require('../Middleware/rolemiddleware');
const School = require('../Models/School');
const schoolValidationSchema = require('../Models/SchoolValidator'); // Keep this one only

const router = express.Router();

router.get('/', authMiddleware, rolemiddleware('superAdmin'), (req, res) => {
    res.json({ message: 'Access to all schools: Super Admin only' });
});


router.post('/', authMiddleware, rolemiddleware('superAdmin'), async (req, res) => {
    const { name, address, contactNumber } = req.body;

   
    const { error } = schoolValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const school = new School({ name, address, contactNumber });
        await school.save();
        res.status(201).json({ message: 'School created successfully', school });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post(
    '/createschools',
    authMiddleware,
    rolemiddleware('superAdmin'),
    async (req, res) => {
        const { error } = schoolValidationSchema.validate(req.body); 
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const newSchool = new School(req.body);
            await newSchool.save();
            res.status(201).json(newSchool);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);


router.get('/getallschools', authMiddleware, rolemiddleware('superAdmin'), async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json(schools);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/getschoolbyid/:id', authMiddleware, rolemiddleware('superAdmin'), async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) return res.status(404).json({ message: 'School not found' });

        res.status(200).json(school);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/updateschool/:id', authMiddleware, rolemiddleware('superAdmin'), async (req, res) => {
    const { name, address, contactNumber } = req.body;

    
    const { error } = schoolValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const school = await School.findByIdAndUpdate(
            req.params.id,
            { name, address, contactNumber },
            { new: true }
        );

        if (!school) return res.status(404).json({ message: 'School not found' });

        res.status(200).json({ message: 'School updated successfully', school });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/deleteschool/:id', authMiddleware, rolemiddleware('superAdmin'), async (req, res) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);

        if (!school) return res.status(404).json({ message: 'School not found' });

        res.status(200).json({ message: 'School deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
