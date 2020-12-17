require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// MongoDB Config
const {db_ip, db_name, db_port} = process.env
const db_url = `mongodb://${db_ip}:${db_port}/${db_name}`
const db_options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
}
mongoose.connect(db_url, db_options)
.then(()=> console.log('DB conectada...'))
.catch(err=> console.error(err))
// Midlewares
app.use(express.json())
app.use(express.urlencoded({limit: '10mb', extended: true}))
// Post Apis
app.use('/posts', require('./routes/postApis/index'))
// Static Files
app.use(express.static(path.join(__dirname, 'public')))
// Start Server
const {server_ip, server_port} = process.env
app.listen(server_port, server_ip, () => {
	console.log(`Server On: http://${server_ip}:${server_port}/`)
})
module.exports = app