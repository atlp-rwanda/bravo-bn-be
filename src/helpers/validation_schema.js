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

<<<<<<< HEAD
    phoneNumber: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
=======
    phoneNumber: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}),
>>>>>>> 24c109d (chore(setup): set up an empty Express Boilerplate with dotenv)

    role: Joi.string(),

    gender: Joi.string(),

    password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z]{3,30}$'))
        .max(8).required(),

    repeat_password: Joi.ref('password'),

    email: Joi.string().lowercase()
        .email().required()
})

