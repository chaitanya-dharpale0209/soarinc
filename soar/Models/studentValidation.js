
const Joi = require('joi');

const studentValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    schoolId: Joi.string().required(),
});

module.exports = studentValidationSchema;
