const { Router } = require('express');
const router = Router();
const { getSearch, getSearchCollection } = require('../controllers/search');
const { jwtValidation } = require('../middleware/jwt-validation');
router.get('/', jwtValidation, getSearch);
router.get('/collection', jwtValidation, getSearchCollection);
module.exports = router;
