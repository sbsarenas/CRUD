const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('data base connected'))
    .catch(err => console.log(err));


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});