const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    post: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, { timestamps: true })

const TextPost = model('Post', postSchema)

module.exports = TextPost;