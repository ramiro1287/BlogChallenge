const mongoose = require('mongoose')
require('dotenv').config()

const {db_ip, db_name, db_port} = process.env
const db_url = `mongodb://${db_ip}:${db_port}/${db_name}`
const db_options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
}
mongoose.connect(db_url, db_options)
.then(()=> console.log('DB conectada...'))
.catch(err=> console.error(err))