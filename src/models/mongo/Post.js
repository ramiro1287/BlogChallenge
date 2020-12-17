const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
	titulo: {type: String, required: true},
	contenido: {type: String, required: true},
	imagen: {type: String, default: ''},
	categoria: {type: String, default: ''},
	fechaCreacion: {type: Date, default: Date.now}
})

module.exports = model('Post', PostSchema)