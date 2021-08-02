
const router = require('express').Router()

const auth = require('../auth/authGuard')
const { createUser, signIn, getImageById, getAllUser, getUserById, deleteUserById } = require('../controllers/userController')

router.route('/signup')
    .post(createUser)
router.route('/signin')
    .get(signIn)
router.route('/image/:id')
    .get(getImageById)
router.route('/all')
    .get(getAllUser)
router.route('/user/:id')
    .get(auth, getUserById)
router.route('/user/delete/:id')
    .get(deleteUserById)



module.exports = router