const express = require('express');
const router = express.Router();
const NewsAPIController = require('./NewsAPIController');
const apiMiddleware = require('../../Middleware/apiMiddleware');

router.get('/', apiMiddleware.extractSearchQuery, NewsAPIController.getSearchResults);

module.exports = router;
