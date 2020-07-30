const express = require('express');
const app = express();
const PORT = 3000;
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {

    console.log('file filter filesize ',file.mimetype, file);

  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/jpg' 
  ) {
      //console.log(true);
    cb(null, true);
  } else {
     // console.log(false);
    cb(null, false);
  }
};
 app.use(multer({ storage: fileStorage, fileFilter: imageFilter,
   limits:{fileSize:20000} })
      .single('image'))
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET ,POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

 

app.use('/books', adminRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});
mongoose
  .connect('mongodb://localhost:27017/Books')
  .then((result) => {
    // console.log('mongodb connected');
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
