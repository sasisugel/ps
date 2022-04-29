const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/userRoutes')

const app = express()

app.use(cors())
app.options('*', cors())

app.use('/users', userRouter)

app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`, 404))
})

const port = 3000
app.listen(port, () => console.log(`App running on port ${port}...`))