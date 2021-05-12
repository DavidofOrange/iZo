const express = require('express');
const path = require('path');
const app = express();
const businessesRouter = require('./businesses');
const usersRouter = require('./users');
const stripeRouter = require('./stripe');
const subscriptionsRouter = require('./subscriptions');

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/api/businesses', businessesRouter);
app.use('/api/users', usersRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/subscriptions', subscriptionsRouter);

module.exports = app;