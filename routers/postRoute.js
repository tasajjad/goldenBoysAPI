const router = require('express').Router()

/**
 * @import internal import
 */
const { textPostController, getPostById, getAllPost, deletePostByPostId } = require('../controllers/postController')
const { test } = require('../controllers/test')
const upload = require('../middlewares/postImages')

router.route('/test')
    .post(upload.fields([
        { name: "post" },
        { name: "photo" },
        { name: "userID" }
    ]), test)

router.route('/post/all')
    .get(getAllPost)

router.route('/post/:id')
    .post(textPostController)
    .get(getPostById)
    .delete(deletePostByPostId)


module.exports = router;