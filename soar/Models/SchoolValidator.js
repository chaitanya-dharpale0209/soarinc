
const Joi = require('joi');

const schoolValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(10).max(200).required(),
    contactNumber: Joi.string().pattern(/^\d{10}$/).required(),
});

module.exports = schoolValidationSchema;
