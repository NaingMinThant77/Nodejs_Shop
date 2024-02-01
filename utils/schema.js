const Joi = require('joi');

module.exports = {
    schema: {
        AddCat: Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(),
            user: Joi.optional()
        }),
        RegisterSchema: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(8).max(11).required(),
            password: Joi.string().min(8).max(25).required()
        }),
        PostSchema: Joi.object({
            cat: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            tag: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            image: Joi.string().required(),
            title: Joi.string().required(),
            desc: Joi.string().required(),
            user: Joi.optional()
        }),
        TagSchema: Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(),
            user: Joi.optional()
        }),
        CommentSchema: Joi.object({
            postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            content: Joi.string().required(),
        }),
        AllSchema: {
            id: Joi.object({
                id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            }),
            image: Joi.object({
                image: Joi.string().required()
            }),
            page: Joi.object({
                page: Joi.number().required()
            }),
        },
    },
}
