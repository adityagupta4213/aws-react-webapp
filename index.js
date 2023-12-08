const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api/todo');

require('dotenv').config();

const port = 80;

const app = express();

//connect to database

const DBPath = 'mongodb://54.156.31.146:27017/todo-app-db';

mongoose.connect(DBPath, {useNewUrlParser: true})
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api',routes);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("./client/build"));


app.listen(port, () => {
    console.log(`Port running on ${port}`)
});