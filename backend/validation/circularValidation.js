//Validation
const Joi = require('@hapi/joi');


//SubDomain Validation
const circularValidation = data => {
    const schema = Joi.object({
        dateofkriyasil: Joi.string().optional(),
        formNumber: Joi.optional(),
        workingformnumber: Joi.string().required(),
        workingformnumberold: Joi.string().optional(),
        membername: Joi.string().required(),
        fathermothername: Joi.string().required(),
        husbandwifename: Joi.string().required(),
        district: Joi.string().required(),
        age: Joi.string().required().required(),
        profession: Joi.string().required().required(),
        gender: Joi.string().required().required(),
        houseofrepresentative: Joi.string().required(),
        pradeshassemblyconstituency: Joi.string().required(),
        municipality: Joi.string().required(),
        wardno: Joi.string().required(),
        inclusivegroup: Joi.string().required(),
        froRconstituencyNo: Joi.string().required(),
        savikmunicipality: Joi.string().required(),
        savikwardno: Joi.string().required(),
        phone: Joi.optional(),
        email: Joi.optional(),
        kaifiyat: Joi.optional(),
        images: Joi.array().required(),
        userRole:Joi.string().required(),
        memberType:Joi.string().required(),
        citizenshipno:Joi.string(),
        nepaladdress:Joi.string(),
        maindistrict:Joi.string().optional(),
        fullAddress:Joi.string().optional(),
        province:Joi.string().optional(),
    });
    return schema.validate(data); 
}

//SubDomain Validation Outside
const circularValidationOut = data => {
    const schema = Joi.object({
        workingformnumber: Joi.string().required(),
        membername: Joi.string().required(),
        fathermothername: Joi.string().required(),
        age: Joi.string().required().required(),
        profession: Joi.string().required().required(),
        gender: Joi.string().required().required(),
        phone: Joi.string().optional(),
        email: Joi.string().optional(),
        kaifiyat: Joi.string().required(),
        images: Joi.array().required(),
        userRole:Joi.string().required(),
        memberType:Joi.string().required(),
        citizenshipno:Joi.string(),
        nepaladdress:Joi.string(),
        address:Joi.string(),
    });
    return schema.validate(data);
}
module.exports.circularValidation = circularValidation;
module.exports.circularValidationOut = circularValidationOut;