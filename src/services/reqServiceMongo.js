const Post = require('../models/mongo/Post')

const requestService = {
	findAll: async () => {
		const data = await Post.find().sort({fechaCreacion: -1})
		const posts = []
		data.map(p => posts.push({
			_id: p._id,
			titulo: p.titulo,
			contenido: p.contenido,
			fechaCreacion: p.fechaCreacion,
			categoria: p.categoria
		}))
		return posts
	},
	findById: async (_id) => {
		const post = await Post.findById({_id})
		return post
	},
	save: async (data) => {
		const {titulo, contenido, categoria} = data
		const post = new Post({titulo, contenido, categoria})
		await post.save()
	},
	update: async (data) => {
		const {_id, titulo, contenido, categoria} = data
		await Post.findByIdAndUpdate({_id}, {titulo, contenido, categoria})
	},
	delete: async (_id) => {
		await Post.findByIdAndRemove({_id})
	}
}

module.exports = requestService