const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middleware/field-validation');
const router = Router();
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { jwtValidation } = require('../middleware/jwt-validation');
router.post(
	'/',
	[
		check('password', 'This field is required').not().isEmpty(),
		check('email', 'This field is required').isEmail(),
		fieldValidation,
	],
	login
);
router.post(
	'/google',
	[check('token', 'This field is required').not().isEmpty(), fieldValidation],
	googleSingIn
);
router.get('/renew', jwtValidation, renewToken);
module.exports = router;
