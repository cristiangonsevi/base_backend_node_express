const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_ODBC, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('db online');
	} catch (err) {
		throw new Error('Error');
	}
};

module.exports = { dbConnection };
