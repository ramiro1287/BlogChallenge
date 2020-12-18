require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const {db_selected} = process.env

// DB Config
if (db_selected) {
	const db = require('./config/dbSql')
	db.authenticate()
	.then(()=>console.log("SQLite's Database Conected..."))
	.catch(err=>console.error(err))
}
else {
	require('./config/dbMongo')
}

// Midlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Post Apis
app.use('/posts', require('./routes/postApis/apis'))
// Static Files
app.use(express.static(path.join(__dirname, 'public')))
// Start Server
const {server_ip, server_port} = process.env
app.listen(server_port, server_ip, () => {
	console.log(`Server On: http://${server_ip}:${server_port}/`)
})
module.exports = app