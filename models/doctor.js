const { Schema, model } = require('mongoose');

const MedicSchema = Schema({
	name: {
		type: String,
		require: true,
	},
	img: {
		type: String,
	},
	user: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	hospital: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'Hospital',
	},
});

MedicSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Doctor', MedicSchema);
