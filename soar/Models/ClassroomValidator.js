const Joi = require('joi');

const classroomValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    capacity: Joi.number().min(1).required(),
    resources: Joi.array().items(Joi.string()).min(1).required(),
    schoolId: Joi.string().required(),
});

module.exports = classroomValidationSchema;
