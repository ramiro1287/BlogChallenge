require('dotenv').config()
const router = require('express').Router()
const {db_selected} = process.env
const dataChecker = require('../../utils/dataChecker')
const handleError = require('../../utils/handleError')

var requestService = {}
if (db_selected) {requestService = require('../../services/reqServiceSql')}
else {requestService = require('../../services/reqServiceMongo')}

router.get('/', async (req, res)=>{
	try{
		const posts = await requestService.findAll()
		res.json({body: {status:'OK', posts}})
	} catch(err){
		handleError(err, res)
	}
})

router.get('/:id', async (req, res)=>{
	try{
		const _id = req.params.id
		const post = await requestService.findById(_id)
		res.json({body: {status:'OK', post}})
	} catch(err){
		handleError(err, res)
	}
})

router.post('/', dataChecker, async (req, res)=>{
	try{
		await requestService.save(req.body)
		res.json({body: {status: 'Created'}})
	} catch(err){
		handleError(err, res)
	}
})

router.put('/', dataChecker, async (req, res)=>{
	try{
		await requestService.update(req.body)
		res.json({body: {status: 'Updated'}})
	} catch(err){
		handleError(err, res)
	}
})

router.delete('/:id', async (req, res)=>{
	try{
		const _id = req.params.id
		await requestService.delete(_id)
		res.json({body: {status: 'Deleted'}})
	} catch(err){
		handleError(err, res)
	}
})

module.exports = router