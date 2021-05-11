const express = require('express');
const path = require('path');
const app = express();
const businessesRouter = require('./businesses');
const busUsersRouter = require('./busUsers');

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/api/businesses', businessesRouter);
app.use('/api/bus-users', busUsersRouter);

module.exports = app;