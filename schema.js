const joi = require("joi");


module.exports.listingSchema = joi.object({

    listing : joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        image:joi.string().allow("",null),
        price:joi.number().required,
        country:joi.required(),
    }).required()
});

module.exports.reviewSchema = joi.object({
    reviews:joi.object({
        rating:joi.number(),
        comment:joi.string(),
    }).required()
});
