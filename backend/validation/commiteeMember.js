//Validation
const Joi = require('@hapi/joi');


//SubDomain Validation
const committeMemberValidation = data => {
    const schema = Joi.object({
        fullname: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        committeMemberType: Joi.string().required(),
        province: Joi.string().optional(),
        district: Joi.string().optional(),
        houseofrepresentative: Joi.string().optional(),
        pradeshassemblyconstituency: Joi.string().optional(),
        municipality: Joi.string().optional(),
        ward: Joi.string().optional(),
        tole: Joi.string().optional(),
        remark: Joi.string().optional(),
        gender: Joi.string().optional(),
        inclusivegroup: Joi.string().optional(),
    });
    return schema.validate(data);
}
module.exports.committeMemberValidation = committeMemberValidation