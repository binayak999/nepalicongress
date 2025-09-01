//Validation
const Joi = require('@hapi/joi');


//Post Validation
const postVaidation = data => {
    const schema = Joi.object({
        eng: Joi.object().required(),
        nep: Joi.object().required(),
        slug: Joi.string().required(),
        externallink: Joi.string(),
        images: Joi.array(),
        videos: Joi.array(),
        attachment: Joi.array(),
        subdomain:Joi.string(),
        model:Joi.string(),
        userRole:Joi.string(),
        dateofhistory:Joi.optional(),
        eventRealDate:Joi.optional(),
        sort:Joi.number()
    });
    return schema.validate(data);
}

//Page Validation
const pageVaidation = data => {
    const schema = Joi.object({
        eng: Joi.object().required(),
        nep: Joi.object().required(),
        externallink: Joi.string(),
        images: Joi.array(),
        videos: Joi.array(),
        attachment: Joi.array(),
        position: Joi.string(),
        pageType: Joi.string(),
        parentPage: Joi.string(),
    });
    return schema.validate(data);
}

//Category Validation
const categoryVaidation = data => {
    const schema = Joi.object({
        eng: Joi.object().required(),
        nep: Joi.object().required(),
        slug: Joi.string(),
        userHandle:Joi.string(),
    });
    return schema.validate(data);
}

//Radio Validation
const radioValidataion = data => {
    const schema = Joi.object({
        engtitle: Joi.string().required(),
        neptitle: Joi.string().required(),
        link: Joi.string().required(),
        stationId: Joi.string().required(),
        wishlist: Joi.boolean().required(),
        image: Joi.string().required(),
        link: Joi.string().required(),
    });
    return schema.validate(data);
}

//Region Validation
const regionVaidation = data => {
    const schema = Joi.object({
        province: Joi.string().required(),
        ward: Joi.string().required(),
        district: Joi.string().required(),
        subMetropolitan: Joi.string().required(),
        zone: Joi.string().required(),
        slug: Joi.string().required(),
        category:Joi.required(),
        region:Joi.required(),
    });
    return schema.validate(data);
}




module.exports.postVaidation = postVaidation
module.exports.pageVaidation = pageVaidation
module.exports.categoryVaidation = categoryVaidation
module.exports.regionVaidation = regionVaidation
module.exports.radioValidataion = radioValidataion
