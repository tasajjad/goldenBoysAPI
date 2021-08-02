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