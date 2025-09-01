//Validation
const Joi = require('@hapi/joi');


//Report Validation
const leaderValidation = data => {
    const schema = Joi.object({
        nep: Joi.object().required(),
        eng: Joi.object().required(),
        images: Joi.array().required(),
        email: Joi.string().required(),
        slug: Joi.string().required(),
    });
    return schema.validate(data);
}

//Report Validation
const committeeValidation = data => {
    const schema = Joi.object({
        nep: Joi.object().required(),
        eng: Joi.object().required(),
        images: Joi.array().required(),
        attachment: Joi.array().optional(),
        sort1:Joi.number().required(),
        sort2:Joi.number().required(),
        sorts:Joi.string().required(),
        facebookUrl: Joi.string(),
        twitterUrl: Joi.string(),
        instagramUrl: Joi.string(),
    });
    return schema.validate(data);
}
module.exports.leaderValidation = leaderValidation
module.exports.committeeValidation = committeeValidation