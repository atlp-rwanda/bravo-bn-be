import Joi from 'joi'

export const signupAuthSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .required(),

    firstName: Joi.string()
        .alphanum()
        .required(),

    lastName: Joi.string()
        .alphanum()
        .required(),

    birthDate: Joi.date(),

    phoneNumber: Joi.number(),

    role: Joi.string(),

    password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z]{3,30}$'))
        .max(8).required(),

    repeat_password: Joi.ref('password'),

    email: Joi.string().lowercase()
        .email().required()
})

