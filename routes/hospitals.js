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
router.put(
	'/:id',
	[
		jwtValidation,
		check('name', 'This field is required').not().isEmpty(),
		check('hospital', 'This field is required').not().isEmpty(),
	],
	updatedHHospital
);
router.delete('/:id', jwtValidation, deleteHHospitals);

module.exports = router;
