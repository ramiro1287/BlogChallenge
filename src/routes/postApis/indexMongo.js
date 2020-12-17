const router = require('express').Router()
const Post = require('../../models/mongo/Post')

router.get('/', async (req, res)=>{
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
		res.json(posts)
	} catch(err){
		handleError(err, res)
	}
})

router.get('/:id', async (req, res)=>{
	try{
		const _id = req.params.id
		const post = await Post.findById({_id})
		res.json({body: {status:'OK', post}})
	} catch(err){
		handleError(err, res)
	}
})

router.post('/', dataChecker, async (req, res)=>{
	const {titulo, contenido, categoria} = req.body
	try{
		const post = new Post({titulo, contenido, categoria})
		await post.save()
		res.json({body: {status: 'Created'}})
	} catch(err){
		handleError(err, res)
	}
})

router.put('/', dataChecker, async (req, res)=>{
	const {_id, titulo, contenido, categoria} = req.body
	try{
		await Post.findByIdAndUpdate({_id}, {titulo, contenido, categoria})
		res.json({body: {status: 'Updated'}})
	} catch(err){
		handleError(err, res)
	}
})

router.delete('/:id', async (req, res)=>{
	const _id = req.params.id
	try{
		await Post.findByIdAndRemove({_id})
		res.json({body: {status: 'Deleted'}})
	} catch(err) {
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