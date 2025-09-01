//Validation
const Joi = require('@hapi/joi');


//SubDomain Validation
const subDominVaidation = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        nepname: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string(),
        userHandle: Joi.string().required(),
        userRole: Joi.string(),
        password: Joi.string(),
        municipality: Joi.string(),
        image: Joi.array(),
        district: Joi.string().required(),
        ward: Joi.number().required(),
        province: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        category: Joi.string(),
        categoryNep: Joi.string(),
        subcategory: Joi.optional(),
        subcategoryNep: Joi.optional(),
        facebookUrl: Joi.optional(),
        twitterUrl: Joi.optional(),
        instagramUrl: Joi.optional(),
        externalLink: Joi.optional(),
        parentSubdomain: Joi.optional(),
        hasChetra: Joi.optional(),
        isChetraParent: Joi.optional(),
        isNagarPalika: Joi.optional(),
    });
    return schema.validate(data);
}
module.exports.subDominVaidation = subDominVaidation