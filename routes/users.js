const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, createUser, updateUser, deleteUSer } = require('../controllers/user');
const { fieldValidation } = require('../middleware/field-validation');
const { jwtValidation } = require('../middleware/jwt-validation');
const router = Router();
router.get('/', jwtValidation, getUser);
router.post(
	'/',
	[
		jwtValidation,
		check('password', 'This field is required').not().isEmpty(),
		check('name', 'This field is required').not().isEmpty(),
		check('email', 'This field is required').isEmail(),
		fieldValidation,
	],
	createUser
);
router.put(
	'/:id',
	[
		jwtValidation,
		check('password', 'This field is required').not().isEmpty(),
		check('name', 'This field is required').not().isEmpty(),
		check('rol', 'This field is required').not().isEmpty(),
		check('email', 'This field is required').isEmail(),
		fieldValidation,
	],
	updateUser
);
router.delete('/:id', jwtValidation, deleteUSer);
module.exports = router;
