const Joi = require('joi');

module.exports.sweetSchema = Joi.object({
    sweet: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        category: Joi.string().required().valid('baked', 'chocolate', 'candy', 'traditional', 'sugar-free', 'international'),
        quantity: Joi.number().required().min(0),
        weight: Joi.string().required(),
        ingredients: Joi.string().required(),
        allergens: Joi.array().items(Joi.string()),
        sweetType: Joi.string().required(),
        available: Joi.boolean() // ADD THIS LINE BACK
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});