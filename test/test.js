// const jwt = require('jsonwebtoken')
// const Joi = require('joi')

// const token = jwt.sign({
//     name: "Sajjad",
//     age: 20,
//     jannat: "Tasin Moni",

// }, "JANNAT", { expiresIn: "1d" })


// JWT decode and jwt compare both are same and both are return decoded data
// const isValid = jwt.verify(token, "JANNAT")

// console.log(jwt.decode(token))


/**
 * @joi
 */

const dummy = {
    name: "Sajjad Ahmed",
    number: 3,
    email: "tasajjad20@gmail.com"
}

const Joi = require("joi")

const schema = Joi.object({
    name: Joi.string().required().min(3).max(12),
    number: Joi.number().required().min(2).max(5),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

const { error } = schema.validate(dummy)


console.log(error)
console.log(error.details[0].message)



if (!error) {
    console.log("There have a no error")
}