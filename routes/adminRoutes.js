const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/',adminController.getBooks);
router.delete('/:bookId',adminController.deleteBooks);
router.post('/',adminController.postBooks);
router.put('/:bookId',adminController.putBooks);

module.exports = router;