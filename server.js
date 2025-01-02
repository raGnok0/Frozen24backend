const express = require('express')
const app = express()
const {db,auth} = require('./firebase')
const bodyParser = require('body-parser')
const { route } = require('./routes/authRoute')
require('dotenv').config()

const port = process.env.PORT || 4010
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',route)


app.listen(port,()=>{
    console.log(`Listening on ${port}`)
})