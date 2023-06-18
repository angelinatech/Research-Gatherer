const express = require('express');
const router = express.Router();
const PubMedAPIController = require('./PubMedAPIController');
const apiMiddleware = require('../../Middleware/apiMiddleware');

router.get('/', apiMiddleware.extractSearchQuery, PubMedAPIController.getSearchResults);

module.exports = router;
