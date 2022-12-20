import Joi from "@hapi/joi";

export const signUpSchema = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required().max(70),
        company: Joi.string(),
        phone: Joi.number(),
        address: Joi.string(),
        password: Joi.string().min(8).max(50).required()
    });

    

    return schema.validate(data)
}

export const loginSchema = Joi.object({
    email: Joi.string().email().required().max(70).trim(),
    password: Joi.string().min(8).max(50).trim().required()
});