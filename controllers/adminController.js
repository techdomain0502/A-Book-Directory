const dataHelper = require('../utils/helper');
const { validationResult } = require('express-validator');
const Book = require('../models/Books');
const { Mongoose, Schema, SchemaType } = require('mongoose');
const fs = require('fs');

function deleteUploadedFile(file){
  fs.unlink(file.path,err=>{
    if(err){
      console.log('error deleting file',err);
    }
  })
}

exports.getBooks = (req, res, next) => {
  console.log('GET books');
  Book.find()
    .then((result) => {
      console.log(result);
      res.status(200).json({ books: result });
    })
    .catch((err) => {
      console.log('erro caught whiel find one');
      console.log(err);
      next(err);
    });
};

exports.getBookById = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then((result) => {
      console.log(result);
      res.status(200).json({ result: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.putBooks = (req, res, next) => {
  console.log('PUT books ');
};

const multerErrorHandler = (err) => {
  console.log('error', err);
};

exports.postBooks = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    deleteUploadedFile(req.file);
    const error = new Error('validation failed on the requested resource');
    error.statusCode = 422;
    throw error;
  }

  
  
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const image = req.file;

  if (!image) {
    const error = new Error('no image present!');
    throw error;
  }
  // console.log('passed');

  const imageUrl = req.file.path;
  
  Book.findOne({ title: title })
    .then((result) => {
      if (result) {
        deleteUploadedFile(req.file);
        const error = new Error('Book already exists by this name');
        
        error.statusCode = 500;
        throw error;
      }

      const book = new Book({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
      });

      book
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: 'Book added successfully',
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
          console.log(err);
        });
    })
    .catch((err) => {
      console.log('erro caught whiel find one');
      console.log(err);
      next(err);
    });
};

exports.deleteBooks = (req, res, next) => {
  console.log('DELETE books ');
};
