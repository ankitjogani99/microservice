const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../validations/userValidation');

router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/:id', userController.getUserById);

module.exports = router;
