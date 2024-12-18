
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    status: { type: String, enum: ['enrolled', 'transferred'], default: 'enrolled' },  
    transferToSchoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null }, 
});

module.exports = mongoose.model('Student', studentSchema);
