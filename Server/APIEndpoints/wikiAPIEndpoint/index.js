const express = require('express');
const router = express.Router();
const WikiAPIController = require('./WikiAPIController');
const apiMiddleware = require('../../Middleware/apiMiddleware');

router.get('/', apiMiddleware.extractSearchQuery, WikiAPIController.getSearchResults);

module.exports = router;
