const dataHelper = require('../utils/helper');

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
  console.log('POST books ');
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  //console.log(title,price,description);

  const book = {
    title: title,
    price: price,
    description: description,
  };

  dataHelper.getBookListFromJsonFile((books) => {
      console.log(books);
    const bookIndex = books.findIndex((book) => book.title === title);
    console.log(bookIndex);
    if (bookIndex != -1) {
      return res.status(500).json({
        message: 'Book Information already exists',
      });
    }

    books.push(book);
    dataHelper.writeBookListToJsonFile(JSON.stringify(books), () => {
      res.status(201).json({
        message: 'Book added successfully',
      });
    });
  });

  //   res.status(201).json({
  //       message:'Book added successfully'
  //   })
};

exports.deleteBooks = (req, res, next) => {
  console.log('DELETE books ');
};
