const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        res.status(500).json({
            message: "Access denied no token provide"
        })
    } else {
        const jwtToken = token.split(' ')[1].trim()
        // console.log(jwtToken)
        try {
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
            if (decoded) {
                next()
            }
        } catch (err) {
            res.status(500).json({ message: "Token Doesn`t Match", })
            console.log(err.message)
        }
    }
}