const express = require('express');
const router = express.Router();
const MyCollectionController = require('./MyCollectionController');
const authMiddleware = require('../Middleware/authMiddleware');


// *~*~*~* saved items in db *~*~*~* 

router.post('/', authMiddleware, MyCollectionController.saveItem);
router.get('/:userEmail', authMiddleware, MyCollectionController.getSavedItems);
router.delete('/:id', authMiddleware, MyCollectionController.deleteItem);
router.put('/:id', authMiddleware, MyCollectionController.updateItem);


module.exports = router;

