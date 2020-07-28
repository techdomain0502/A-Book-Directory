const express = require('express');
const app = express();
const PORT= 3000;
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods',' PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use('/books',adminRoutes);

app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
});
mongoose.connect('mongodb://localhost:27017/Books')
.then((result)=>{
   // console.log('mongodb connected');
    app.listen(PORT);
})
.catch(err=>{
    console.log(err);
});
