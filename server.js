const app = require('./app')
const db = require('./database')


db()
    .then(function (response) {
        console.log("Database Connection Succesfull !")
    })
    .catch(function (err) {
        console.log(err)
    })

const PORT = process.env.PORT || 3001

app.listen(PORT, function () {
    console.log(`App Running on port ${PORT}`)
})