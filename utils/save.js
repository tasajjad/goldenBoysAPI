module.exports = async function (user) {

    const returnData = await user.save()
    if (returnData) {

        res.status(200).json({
            message: "User Created successfully",
            data: result
        })
    } else {
        res.status(500).json("There have some internal problem")

    }
}