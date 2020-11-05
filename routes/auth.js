const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middleware/field-validation');
const router = Router();
const { login } = require('../controllers/auth');
router.post(
	'/',
	[
		check('password', 'This field is required').not().isEmpty(),
		check('email', 'This field is required').isEmail(),
		fieldValidation,
	],
	login
);
module.exports = router;
