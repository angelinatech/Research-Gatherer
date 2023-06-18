const express = require('express');
const router = express.Router();
const GoogleAPIController = require('./GoogleAPIController');
const apiMiddleware = require('../../Middleware/apiMiddleware');

router.get('/', apiMiddleware.extractSearchQuery, GoogleAPIController.getSearchResults);

module.exports = router;
