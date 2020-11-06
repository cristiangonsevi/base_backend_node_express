const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const getSearch = async (req, res) => {
	const q = req.query.q;
	const query = new RegExp(q, 'i');
	const [userSearch, doctorSearch, hospitalSearch] = await Promise.all([
		User.find({ name: query }),
		Doctor.find({ name: query }),
		Hospital.find({ name: query }),
	]);
	res.json({ ok: true, userSearch, doctorSearch, hospitalSearch });
};
const getSearchCollection = async (req, res) => {
	const q = req.query.q;
	const collection = req.query.c;
	const query = new RegExp(q, 'i');
	let dataSearch = [];
	switch (collection) {
		case 'user':
			dataSearch = await User.find({ name: query });
			break;
		case 'doctor':
			dataSearch = await Doctor.find({ name: query })
				.populate('user', 'name img')
				.populate('hospital', 'name img');
			break;
		case 'hospital':
			dataSearch = await Hospital.find({ name: query }).populate('user', 'name img');
			break;

		default:
			return res.status(400).json({
				ok: false,
				msg: 'Collection not found',
			});
	}

	res.json({ ok: true, dataSearch });
};
module.exports = { getSearch, getSearchCollection };
