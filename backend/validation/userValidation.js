//Validation
const Joi = require('@hapi/joi');
const { number } = require('@hapi/joi');


//Register Validation

const registerValidation = data => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required().max(10).min(10),
        dob:Joi.date().required(),
        municipality:Joi.string().required(),
        district:Joi.string().required(),
        ward:Joi.number().required(),
        city:Joi.string().required(),
        gender:Joi.string().required(),
        province:Joi.string().required(),
        nearestlandmark:Joi.optional(),
        address:Joi.string().required(),
        memberId:Joi.string(),
        memberPost:Joi.string(),
        // onlineMemberId:Joi.string(),
        about:Joi.string(),
        // facebook_profile:Joi.string(),
        // twitter_profile:Joi.string(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

//Register Action Validation

const registerActionValidation = data => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required().max(10).min(10),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

//VerifyValidation
const verifyValidation = data => {
    const schema = Joi.object({
        input: Joi.string().required(),
        otp: Joi.number().min(4).required()
    });
    return schema.validate(data);
}


//UpdateForgetPassword
const forgetPasswordValidation = data => {
    const schema = Joi.object({
        input: Joi.string().required(),
        otp: Joi.number().min(4).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

//SendOTPNewPassword
const sendOTPPasswordValidation = data => {
    const schema = Joi.object({
        input: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}



//VerifyValidation
const resendOTPValidation = data => {
    const schema = Joi.object({
        input: Joi.string().required()
    });
    return schema.validate(data);
}

//Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        input: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}
//Login Validation
const loginValidationGeneral = data => {
    const schema = Joi.object({
        input: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

const updateValidation = data => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        municipality:Joi.string().required(),
        district:Joi.string().required(),
        ward:Joi.number().required(),
        city:Joi.string().required(),
        province:Joi.number().required(),
        nearestlandmark:Joi.string().required(),
        address:Joi.string().required(),
        memberId:Joi.string(),
        about:Joi.string(),
        facebook_profile:Joi.string(),
        twitter_profile:Joi.string(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation
module.exports.registerActionValidation = registerActionValidation
module.exports.loginValidation = loginValidation
module.exports.verifyValidation = verifyValidation
module.exports.resendOTPValidation = resendOTPValidation
module.exports.forgetPasswordValidation = forgetPasswordValidation
module.exports.sendOTPPasswordValidation = sendOTPPasswordValidation
module.exports.updateValidation = updateValidation
module.exports.loginValidationGeneral = loginValidationGeneral
