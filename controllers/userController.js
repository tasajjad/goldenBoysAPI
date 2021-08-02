
const formidable = require('formidable')
const fs = require('fs')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const { validateUser } = require('../validation/validation')


/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @createUser create a user with image or not image
 * @alreadyUser if already have a stored an email a database so doesn`t create account
 * @next next email unique depreceted and user name should be unique
 */

module.exports.createUser = function (req, res) {
    const form = new formidable.IncomingForm()
    form.keepExtension = true;

    form.parse(req, async function (err, fields, files) {
        let { fullName, email, password } = fields;
        if (err) {
            res.status(500).send(err)
        } else if (files.photo) {
            const maxFileSize = 1024 * 1024 * 18
            if (files.photo.type === 'image/jpg' || files.photo.type === 'image/jpeg' || files.photo.type === 'image/png') {
                if (files.photo.size < maxFileSize) {
                    // Main Logic
                    const { error } = validateUser(fields)
                    if (!error) {
                        // new 
                        const findUser = await User.find({ email: email })
                        console.log(findUser)
                        if (findUser.length !== 0) {
                            res.status(500).json({
                                message: "User Already Registered"
                            })
                        } else {

                            // Main
                            fs.readFile(files.photo.path, async function (err, data) {
                                if (err) {
                                    res.status(500).send("Internal Problem")
                                } else {
                                    try {
                                        const salt = await bcrypt.genSalt(10)
                                        const hashedPassword = await bcrypt.hash(password, salt)
                                        const user = new User({ fullName: fullName, email: email, password: hashedPassword, })
                                        user.photo.data = data
                                        user.photo.contentType = files.photo.type

                                        const saveData = await user.save()
                                        if (saveData) {
                                            res.status(200).json({
                                                message: "Account created succesfull",
                                                userName: saveData.fullName,
                                                email: saveData.email
                                            })
                                        } else {
                                            res.status(500).send("Nothing Failed !")
                                        }
                                    } catch (err) {
                                        res.status(500).send("A error Occured")
                                    }
                                }
                            })

                        }
                    } else {
                        res.status(500).json({
                            message: error.details[0].message

                        })
                    }

                } else {
                    res.send("Thisn is file is more than 1 MB")
                }
            } else {

                res.status(500).send("Only Image file supported !")
            }

        } else {
            const { error } = validateUser(fields);
            if (error) {
                res.status(500).json({
                    message: error.details[0].message
                })
            } else {
                const { fullName, email, password } = fields
                try {

                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt)
                    console.log(hashedPassword)
                    const createUser = new User({ fullName, email, password: hashedPassword })
                    createUser.save((err, result) => {
                        if (!err) {

                            res.status(200).json({
                                message: "Account Created successfully",
                                data: result
                            })
                        } else {
                            res.status(500).json("There have some internal problem")
                            console.log("[ERROR]", err.message)
                        }
                    })


                } catch (err) {
                    res.status(500).json("Database Error")
                }
            }

        }
    })

}

module.exports.signIn = async function (req, res) {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email }).select({ photo: false })
    if (!userExist) {
        res.status(500).json({
            message: "User Not Found"
        })
    } else {
        const isValid = await bcrypt.compare(password, userExist.password)
        if (isValid) {
            const token = userExist.generateJWT()
            res.status(200).json({
                message: "Sign In Succesfull",
                token: token,
            })
        } else {
            res.status(500).json({
                message: "Invalid email or password"
            })
        }


    }
}

/**
 * 
 * @param {object} res 
 * @param {object} req 
 */


module.exports.getAllUser = async function (req, res) {
    try {
        const allUser = await User.find().select({ photo: 0 })
        if (allUser) {
            res.status(200).json(allUser)
        } else {
            res.status(500).json({ message: 'Some error occured' })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
    }

}
/**
 * 
 * @param {object} res 
 * @param {object} req 
 */

module.exports.getUserById = async function async(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById({ _id: id }).select({ photo: false });
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User Not Found !" })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}
/**
 * 
 * @param {object} req 
 * @param {object} res 
 */
module.exports.getImageById = async function (req, res) {
    const { id } = req.params;

    try {
        const usr = await User.findById({ _id: id }).select({ photo: 1, _id: 0 })
        if (usr) {

            res.set('Content-Type', usr.photo.contentType)
            res.status(200).send(usr.photo.data)
        } else {
            res.status(404).json({ message: 'User Not Found !' })
        }
    } catch (err) {
        res.status(500).json({ message: "Some database error" })
        console.log(err.message)
    }
}

module.exports.deleteUserById = async function (req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: id })
        console.log(deletedUser)
        if (deletedUser) {
            res.status(200).json({
                message: "User Deleted Succesfull",
                user: deletedUser._id
            })
        } else {
            res.status(500).json({ message: "User Not Found !" })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}