require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const db = require('../db')
app.use(express.json())

let router = require('./routes.js')

app.use('/', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports.app = app