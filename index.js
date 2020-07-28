const express = require('express');
const app = express();
const PORT= 8080;
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use('/books',adminRoutes);

app.listen(PORT);