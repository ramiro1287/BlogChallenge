const router = require('express').Router()
const requestService = require('../../utils/requestService')
const dataChecker = require('../../utils/dataChecker')

router.get('/', async (req, res)=>{
	const posts = await requestService.findAll(res)
	if (posts) {
		res.json({body: {status:'OK', posts}})
	}
})

router.get('/:id', async (req, res)=>{
	const _id = req.params.id
	const post = await requestService.findById(res, _id)
	if (post) {
		res.json({body: {status:'OK', post}})
	}
})

router.post('/', dataChecker, async (req, res)=>{
	const answer = await requestService.save(res, req.body)
	if (answer) {
		res.json({body: {status: 'Created'}})
	}
})

router.put('/', dataChecker, async (req, res)=>{
	const answer = await requestService.update(res, req.body)
	if (answer) {
		res.json({body: {status: 'Updated'}})
	}
})

router.delete('/:id', async (req, res)=>{
	const _id = req.params.id
	const answer = await requestService.delete(res, _id)
	if (answer) {
		res.json({body: {status: 'Deleted'}})
	}
})

module.exports = router