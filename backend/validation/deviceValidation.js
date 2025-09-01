//Validation
const Joi = require('@hapi/joi');


//SubDomain Validation
const deviceValidation = data => {
    const schema = Joi.object({
        deviceToken: Joi.string().required(),
        phone: Joi.optional(),
        email: Joi.optional(),
        notificationFor: Joi.string().required(),
    });
    return schema.validate(data);
}
module.exports.deviceValidation = deviceValidation