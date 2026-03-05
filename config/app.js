const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const cors = require('../middleware/cors')

app.use(cors);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1/', require('../routes/router'))

module.exports = app