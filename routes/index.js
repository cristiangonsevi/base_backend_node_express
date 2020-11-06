const express = require('express');
const app = express();

// routes
app.get('/', (req, res) => {
	res.json({ ok: true, msg: 'Api v1' });
});
app.use('/users', require('./users'));
app.use('/hospitals', require('./hospitals'));
app.use('/doctors', require('./doctors'));
app.use('/search', require('./search'));
app.use('/upload', require('./uploads'));
app.use('/auth', require('./auth'));
module.exports = app;
