const router = require('express').Router()
const Post = require('../../models/Post')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const {promisify} = require('util')
const crypto = require('crypto')
const pipeline = promisify(require('stream').pipeline)

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

/*router.post('/', multer().single('Image'), async (req, res)=>{
	const {titulo, contenido, categoria} = req.body
	const file = req.file
	const fileExtension = fileExtensionReader(file.clientReportedMimeType)
	if (fileExtension === file.clientReportedFileExtension) {
		const fileName = crypto.randomBytes(Math.ceil((16*3)/4)).toString('base64').slice(0, 16).replace(/\+/g, '0').replace(/\//g, '0')
		const imgName = `${fileName}${fileExtension}`
		try{
			await pipeline(file.stream, fs.createWriteStream(`${__dirname}/../../public/uploads/${imgName}`))
			const post = new Post({titulo, contenido, categoria, imagen: imgName})
			await post.save()
			res.json({body: {status: 'Created'}})
		} catch(err){
			handleError(err, res)
		}
	}
	else {
		console.error('Invalid Extension...')
		res.json({Status: 'Error'})
	}
})*/

router.post('/', async (req, res)=>{
	const {titulo, contenido, categoria} = req.body
	try{
		const post = new Post({titulo, contenido, categoria})
		await post.save()
		res.json({body: {status: 'Created'}})
	} catch(err){
		handleError(err, res)
	}
})

router.put('/:id', async (req, res)=>{
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

function fileExtensionReader(type) {
	switch(type) {
		case 'image/png': return '.png';
		case 'image/jpeg': return '.jpeg';
		case 'image/jpg': return '.jpg';
		default: return ''
	}
}
function handleError(err, res) {
	res.json({body: {status: 'Error'}})
	console.error(err) 
}