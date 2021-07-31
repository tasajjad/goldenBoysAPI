module.exports = function (req, res, next) {
    res.status(404).send("Wrong url! NOT FOUND")
}