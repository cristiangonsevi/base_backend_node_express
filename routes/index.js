const express = require('express');
const app = express();

// routes
app.get('/', (req, res) => {
	res.json({ ok: true, msg: 'Api v1' });
});
app.use('/users', require('./users'));
app.use('/auth', require('./auth'));
module.exports = app;
