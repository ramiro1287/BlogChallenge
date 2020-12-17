require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()

// MongoDB Config
require('./config/dbMongo')
// Midlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Post Apis
app.use('/posts', require('./routes/postApis/indexMongo'))
// Static Files
app.use(express.static(path.join(__dirname, 'public')))
// Start Server
const {server_ip, server_port} = process.env
app.listen(server_port, server_ip, () => {
	console.log(`Server On: http://${server_ip}:${server_port}/`)
})
module.exports = app