const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config()

/**
 * @internal import 
 */

const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRoute')
const notFound = require('./errors/notFound')
const defaultError = require('./errors/defaultError')

app.use(express.json());
app.use(cors())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/user/auth', userRouter)
app.use('/api/user/', postRouter)

app.use(notFound)
app.use(defaultError)

module.exports = app;