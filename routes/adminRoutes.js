const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getBooks);
router.get('/:bookId',adminController.getBookById);
router.delete('/:bookId', adminController.deleteBooks);
router.post(
  '/',
  [
    body('title').trim().isLength({ min: 5 }),
    body('description').trim().isLength({ min: 5 }),
    body('price').trim().isAlphanumeric(),
  ],
  adminController.postBooks
);
router.put('/:bookId', adminController.putBooks);

module.exports = router;
