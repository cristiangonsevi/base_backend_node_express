const Hospital = require('../models/hospital');
const getHHospitals = async (req, res) => {
	const hospitals = await Hospital.find().populate('user', 'name img');
	res.json({ ok: true, hospitals });
};
const createHHospital = async (req, res) => {
	const uid = req.uid;
	try {
		const hospital = new Hospital({
			user: uid,
			...req.body,
		});
		await hospital.save();
		res.json({ ok: true, hospital });
	} catch (error) {
		console.log(error);
		res.json({ ok: false, msg: 'Oops, we have some errors, please see logs' });
	}
};
const updatedHHospital = (req, res) => {
	res.json({ ok: true });
};
const deleteHHospitals = (req, res) => {
	res.json({ ok: true });
};
module.exports = { getHHospitals, createHHospital, updatedHHospital, deleteHHospitals };
