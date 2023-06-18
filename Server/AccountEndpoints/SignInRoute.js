const express = require('express');
const router = express.Router();
const AuthController = require('./AuthController');


// *~*~*~* Account auth in db *~*~*~* 

router.post('/', AuthController.login);

module.exports = router;