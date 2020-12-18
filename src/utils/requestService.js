require('dotenv').config()
const {db_selected} = process.env
const handleError = require('./handleError')
var Post = null

if (db_selected) {Post = require('../models/sql/Post')}
else {Post = require('../models/mongo/Post')}

const requestService = {
	findAll: async (res) => {
		if (db_selected) {
			try{
				const posts = await Post.findAll({
					order: [['fechaCreacion', 'DESC']],
					attributes: ['_id', 'titulo', 'contenido', 'categoria', 'fechaCreacion']
				})
				return posts
			} catch(err) {
				handleError(err, res)
				return null
			}
		}
		else {
			try{
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
			} catch(err){
				handleError(err, res)
				return null
			}
		}
	},
	findById: async (res, _id) => {
		if (db_selected) {
			try{
				const post = await Post.findAll({
					where: {_id},
					attributes: ['_id', 'titulo', 'contenido', 'categoria', 'fechaCreacion']
				})
				return post[0].dataValues
			} catch(err){
				handleError(err, res)
				return null
			}
		}
		else {
			try{
				const post = await Post.findById({_id})
				return post
			} catch(err){
				handleError(err, res)
				return null
			}
		}
	},
	save: async (res, data) => {
		if (db_selected) {
			try{
				const {titulo, contenido, categoria} = data
				await Post.create({titulo, contenido, categoria})
				return true
			} catch(err){
				handleError(err, res)
				return false
			}
		}
		else {
			try{
				const {titulo, contenido, categoria} = data
				const post = new Post({titulo, contenido, categoria})
				await post.save()
				return true
			} catch(err){
				handleError(err, res)
				return false
			}
		}
	},
	update: async (res, data) => {
		if (db_selected) {
			try{
				const {_id, titulo, contenido, categoria} = data
				await Post.update({titulo, contenido, categoria}, {where: {_id}})
				return true
			} catch(err){
				handleError(err, res)
				return false
			}
		}
		else {
			try{
				const {_id, titulo, contenido, categoria} = data
				await Post.findByIdAndUpdate({_id}, {titulo, contenido, categoria})
				return true
			} catch(err){
				handleError(err, res)
				return false
			}
		}
	},
	delete: async (res, _id) => {
		if (db_selected) {
			try{
				await Post.destroy({where: {_id}})
				return true
			} catch(err){
				handleError(err, res)
				return false
			}
		}
		else {
			try{
				await Post.findByIdAndRemove({_id})
				return true
			} catch(err){
				handleError(err, res)
				return false
			}
		}
	}
}

module.exports = requestService