require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const createClient = require('../db')
app.use(express.json())
const path = require('path')

const staticFilePath = path.join(__dirname, '..', 'public')
app.use(express.static(staticFilePath))


let router = require('./routes.js')

app.use('/', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports.app = app