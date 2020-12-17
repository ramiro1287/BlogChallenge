const router = require('express').Router()
const Post = require('../../models/sql/Post')

router.get('/', async (req, res)=>{
	try{
		const posts = await Post.findAll({
			order: [['fechaCreacion', 'DESC']],
			attributes: ['_id', 'titulo', 'contenido', 'categoria', 'fechaCreacion']
		})
		res.json(posts)
	} catch(err){
		handleError(err, res)
	}
})

router.get('/:id', async (req, res)=>{
	const _id = req.params.id
	try{
		const post = await Post.findAll({
			where: {_id},
			attributes: ['_id', 'titulo', 'contenido', 'categoria', 'fechaCreacion']
		})
		res.json({body: {status:'OK', post: post[0].dataValues}})
	} catch(err){
		handleError(err, res)
	}
})

router.post('/', dataChecker, async (req, res)=>{
	try{
		const {titulo, contenido, categoria} = req.body
		await Post.create({titulo, contenido, categoria})
		res.json({body: {status: 'Created'}})
	} catch(err){
		handleError(err, res)
	}
})

router.put('/', async (req, res)=>{
	try{
		const {_id, titulo, contenido, categoria} = req.body
		await Post.update({titulo, contenido, categoria}, {where: {_id}})
		res.json({body: {status: 'Updated'}})
	} catch(err){
		handleError(err, res)
	}
})

router.delete('/:id', async (req, res)=>{
	try{
		const _id = req.params.id
		await Post.destroy({where: {_id}})
		res.json({body: {status: 'Deleted'}})
	} catch(err){
		handleError(err, res)
	}
})

module.exports = router

function dataChecker(req, res, next) {
	var errors = false
	const body = req.body
	for (var prop in body) {
		if (body[prop]==='') {
			errors = true
			break
		}
	}
	if(errors) {
		res.json({body: {status: 'Error'}})
	}
	else {
		next()
	}
}
function handleError(err, res) {
	res.json({body: {status: 'Error'}})
	console.error(err) 
}