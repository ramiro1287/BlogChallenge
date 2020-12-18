function handleError(err, res) {
	res.json({body: {status: 'Error'}})
	console.error(err) 
}
module.exports = handleError