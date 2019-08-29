const express           = require('express')
const mongoose          = require('mongoose')
const bodyParser        = require('body-parser')
const path              = require('path')

const connectDB         = require('./config/db')

const app               = express()
const PORT              = process.env.PORT || 5000


connectDB()

app.use(express.json({ extended: false }))


/* LISTENING */
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))