const dataHelper = require('../utils/helper');
const { validationResult } = require('express-validator');
const Book = require('../models/Books');

exports.getBooks = (req, res, next) => {
  console.log('GET books');

  dataHelper.getBookListFromJsonFile((books) => {
    if (!books)
      res.status(500).json({
        message: 'Internal server error. Please try again!',
      });
    res.status(200).json(books);
  });
};

exports.putBooks = (req, res, next) => {
  console.log('PUT books ');
};

exports.postBooks = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      const error = new Error('validation failed on the requested resource');
      error.statusCode = 422;
      throw error;
    // return res.status(422).json({
    //   message: 'validation failed on the requested resource',
    //   errors: errors.array(),
    // });
  }

  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  //console.log(title,price,description);

  Book.findOne({title:title})
  .then(result=>{
      console.log('rsult-----')
      console.log(result);
      if(result){
          const error = new Error('Book already exists by this name');
          error.statusCode = 500;
          throw error;
      }
      const book = new Book({
        title: title,
        price: price,
        description: description,
      });
    
      book.save()
      .then(result=>{
          console.log(result);
          res.status(201).json({
            message: 'Book added successfully',
          });
      })
      .catch(err=>{
          if(!err.statusCode){
              err.statusCode = 500;
          }
          next(err);
          console.log(err);
      });
  })
  .catch(err=>{
      console.log('erro caught whiel find one');
      console.log(err);
      next(err);
  })

  

//   dataHelper.getBookListFromJsonFile((books) => {
//     //      console.log(books);
//     const bookIndex = books.findIndex((book) => book.title === title);
//     //  console.log(bookIndex);
//     if (bookIndex != -1) {
//       return res.status(500).json({
//         message: 'Book Information already exists',
//       });
//     }

//     books.push(book);
//     dataHelper.writeBookListToJsonFile(JSON.stringify(books), () => {
//       res.status(201).json({
//         message: 'Book added successfully',
//       });
//     });
//   });

  //   res.status(201).json({
  //       message:'Book added successfully'
  //   })
};

exports.deleteBooks = (req, res, next) => {
  console.log('DELETE books ');
};
