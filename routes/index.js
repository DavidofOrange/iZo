const express = require('express');
const path = require('path');
const app = express();
const businessesRouter = require('./businesses');
const usersRouter = require('./users');

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/api/businesses', businessesRouter);
app.use('/api/users', usersRouter);

module.exports = app;