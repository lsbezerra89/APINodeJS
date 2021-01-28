const express = require('express');
const app = express();
const mongoDb = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./Routes/user');
const indexRoute = require('./Routes/index');

const configs = require('./Config/configs');

const urlMongo = configs.connection_string;

const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoDb.connect(urlMongo, options);
mongoDb.set('useCreateIndex', true);

mongoDb.connection.on('error', (err) => {
    console.log('MongoDb connection error: ' + err);
})

mongoDb.connection.on('disconnected', () => {
    console.log('disconnected from the database');
})

mongoDb.connection.on('connected', () => {
    console.log('connected to the database!');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/users', userRoute);

app.listen(4000);

module.exports = app;