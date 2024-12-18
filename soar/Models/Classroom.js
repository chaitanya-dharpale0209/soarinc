const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    resources: { type: [String], required: true }, 
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }, 
});

module.exports = mongoose.model('Classroom', classroomSchema);
