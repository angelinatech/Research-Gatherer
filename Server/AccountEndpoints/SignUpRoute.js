const express = require('express');
const router = express.Router();
const AuthController = require('./AuthController');


// *~*~*~* Account create in db *~*~*~* 

router.post('/', AuthController.signup);

module.exports = router;