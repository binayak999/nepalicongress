//Validation
const Joi = require('@hapi/joi');


//Report Validation
const reportValidation = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        images: Joi.array(),
    });
    return schema.validate(data);
}


//Poll Validation
const pollValidation = data => {
    const schema = Joi.object({
        eng: Joi.object().required(),
        nep: Joi.object().required(),
        pollTopicId:Joi.string().required(),
        votesFor:Joi.array().required(),
    });
    return schema.validate(data);
}



//Poll Validation
const voteValidation = data => {
    const schema = Joi.object({
        eng: Joi.object().required(),
        nep: Joi.object().required(),
        voteTopicId:Joi.string().required(),
        numberofvoters:Joi.string().required(),
        votesFor:Joi.array().required(),
        smsSentTo:Joi.array(),
        sms:Joi.string()
    });
    return schema.validate(data);
}

//Forum Validation
const forumValidation = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        images: Joi.array(),
    });
    return schema.validate(data);
}

//Lettertoleader Validation
const lettertoleaderValidation = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        email: Joi.string().required(),
    });
    return schema.validate(data);
}
module.exports.reportValidation = reportValidation
module.exports.pollValidation = pollValidation
module.exports.forumValidation = forumValidation
module.exports.lettertoleaderValidation = lettertoleaderValidation
module.exports.voteValidation = voteValidation
