
const TextPost = require('../models/textPost')


/**
 * 
 * @param {object} req 
 * @param {object} res 
 */


module.exports.textPostController = async function (req, res) {
    const { id } = req.params;
    const post = req.body.post;


    try {
        const createPost = new TextPost({ post, user: id })
        const savePost = await createPost.save()
        if (savePost) {
            res.status(200).json({
                message: 'Post Published Succesfull',
                data: savePost
            })
        } else {
            res.status(500).json({ message: "Error Occured" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err)
    }
}



/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @params Ths function is Get User By ID Invisual user 
 */

module.exports.getPostById = async function (req, res) {
    const { id } = req.params;
    const dummyArray = [];
    try {
        const userPost = await TextPost.find({ user: id })

        console.log(userPost)
        if (userPost.length === 0) {
            res.status(404).json({ message: "Post not found !" })
        } else {
            for (let data of userPost) {
                dummyArray.push(data)
            }
            res.status(200).json({ userData: [...dummyArray] })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}

module.exports.getAllPost = async function (req, res) {
    console.log("This route Calling")
    try {
        const allPosts = await TextPost.find()
        console.log(allPosts)
        if (allPosts.length === 0) {
            res.status(500).json({ message: "Post Not Found" })
        } else {
            res.status(200).json({ allPosts })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
        // console.log(err)
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @deletePostByID is specific post delete on requested user post
 */

module.exports.deletePostByPostId = async function deletePostById(req, res) {
    const { id } = req.params
    try {
        const deletedPost = await TextPost.findByIdAndDelete({ _id: id })
        if (deletedPost) {
            res.status(200).json({
                message: "Deleted post !",
                post: deletedPost
            })
        } else {
            res.status(404).json({ message: "Post Not Found !" })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}