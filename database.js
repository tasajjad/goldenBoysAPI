const mongoose = require('mongoose')
const databaseURL = process.env.LOCALE_DATABASE_URL


module.exports = function () {
    return mongoose.connect(databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
}