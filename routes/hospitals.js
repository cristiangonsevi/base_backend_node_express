const { Router } = require('express');
const { check } = require('express-validator');
const {
	getHHospitals,
	createHHospital,
	updatedHHospital,
	deleteHHospitals,
} = require('../controllers/hospital');
const { fieldValidation } = require('../middleware/field-validation');
const { jwtValidation } = require('../middleware/jwt-validation');
const router = Router();

router.get('/', getHHospitals);
router.post(
	'/',
	[
		jwtValidation,
		check('name', 'This field is required').not().isEmpty(),
		fieldValidation,
	],
	createHHospital
);
router.put('/:id', updatedHHospital);
router.delete('/:id', deleteHHospitals);

module.exports = router;
