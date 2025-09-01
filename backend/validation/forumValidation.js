//Validation
const Joi = require('@hapi/joi');


//LetterToLeader Validation
const actionUser = data => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
    });
    return schema.validate(data);
}



//Report Validation
const letterToLeader = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        images: Joi.array(),
    });
    return schema.validate(data);
}
module.exports.actionUser = actionUser
module.exports.letterToLeader = letterToLeader