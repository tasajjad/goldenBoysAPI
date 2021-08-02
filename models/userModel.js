const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true })

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        fullName: this.fullName,
        email: this.email,
    }, process.env.JWT_SECRET, { expiresIn: "30d" })
    return token;
}


module.exports = User = model('User', userSchema)