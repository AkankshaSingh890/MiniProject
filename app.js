const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors");
const jwtlib = require("jsonwebtoken")
require('colors')
const routes = require('./routes/user')
const url = require('./config/config')
const app = express();
const port = 5000;


app.use(express.static('./public'));
app.use(cors())
//db connection
mongoose.connect(url)
console.log("MongoDB Connection Successful".yellow.underline.bold);
app.use(bodyParser.json())
app.use(routes)
app.listen(port, () => {
    console.log("Server Listening on port 5000".red.underline.bold);
})
