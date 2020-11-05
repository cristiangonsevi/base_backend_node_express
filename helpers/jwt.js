const jwt = require('jsonwebtoken');
const { Promise } = require('mongoose');
const createJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
		};
		const options = {
			expiresIn: '8h',
		};
		jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
};

module.exports = { createJWT };
