//Validation
const Joi = require('@hapi/joi');


//SubDomain Validation
const activeMemberVaidation = data => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        subDomain: Joi.string().optional(),
        phone: Joi.string().required(),
        email: Joi.string().optional(),
        password: Joi.string().required(),
        accountType: Joi.string().required(),
        province: Joi.string().optional(),
        district: Joi.string().optional(),
        houseofrepresentative: Joi.string().optional(),
        pradeshassemblyconstituency: Joi.string().optional(),
        municipality: Joi.string().optional(),
        ward: Joi.string().optional(),
        tole: Joi.string().optional(),
        committeeMemberType: Joi.string().optional(),

    });
    return schema.validate(data);
}
module.exports.activeMemberVaidation = activeMemberVaidation