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
module.exports = dataChecker