const Joi = require('joi')

module.exports.validateUser = function (user) {
    const schema = Joi.object({
        fullName: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .required().min(6).max(50),

        repeat_password: Joi.ref('password')


    })

    return schema.validate(user)
}

