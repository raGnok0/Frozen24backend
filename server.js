const express = require('express')
const cors = require('cors')
const app = express()
const {db,auth} = require('./firebase')
const bodyParser = require('body-parser')
const { route } = require('./routes/authRoute')
require('dotenv').config()

const port = process.env.PORT || 4010
app.use(cors({
    origin:'https://frozen24.in',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',route)


app.listen(port,()=>{
    console.log(`Listening on ${port}`)
})