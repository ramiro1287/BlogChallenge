const Post = require('../models/sql/Post')

const requestService = {
	findAll: async () => {
		const posts = await Post.findAll({
			order: [['fechaCreacion', 'DESC']],
			attributes: ['_id', 'titulo', 'contenido', 'categoria', 'fechaCreacion']
		})
		return posts
	},
	findById: async (_id) => {
		const post = await Post.findAll({
			where: {_id},
			attributes: ['_id', 'titulo', 'contenido', 'categoria', 'fechaCreacion']
		})
		return post[0].dataValues
	},
	save: async (data) => {
		const {titulo, contenido, categoria} = data
		await Post.create({titulo, contenido, categoria})
	},
	update: async (data) => {
		const {_id, titulo, contenido, categoria} = data
		await Post.update({titulo, contenido, categoria}, {where: {_id}})
	},
	delete: async (_id) => {
		await Post.destroy({where: {_id}})
	}
}

module.exports = requestService