const { Router } = require('express');
const { check } = require('express-validator');
const {
	getDoctors,
	createDoctor,
	updatedDoctor,
	deleteDoctor,
} = require('../controllers/doctor');
const { fieldValidation } = require('../middleware/field-validation');
const { jwtValidation } = require('../middleware/jwt-validation');
const router = Router();

router.get('/', [jwtValidation], getDoctors);
router.post(
	'/',
	[
		jwtValidation,
		check('name', 'This field is required').not().isEmpty(),
		check('hospital', 'This field is required').not().isEmpty(),
		check('hospital', 'This field is not valid').isMongoId(),
		fieldValidation,
	],
	createDoctor
);
router.put('/:id', [jwtValidation], updatedDoctor);
router.delete('/:id', [jwtValidation], deleteDoctor);

module.exports = router;
