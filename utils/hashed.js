const bcrypt = require('bcrypt')

function Test(password) {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    if (hashedPassword) {
        return hashedPassword
    }


}

