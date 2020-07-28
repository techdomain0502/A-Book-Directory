const express = require('express');
const app = express();
const PORT= 3000;
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods',' PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use('/books',adminRoutes);

app.listen(PORT);