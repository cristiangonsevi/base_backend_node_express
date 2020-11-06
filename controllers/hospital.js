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
		res.json({
			ok: false,
			msg: 'Oops, we have some errors, please see logs',
		});
	}
};
const updatedHHospital = async (req, res) => {
	const id = req.params.id;
	const uid = req.uid;
	try {
		const hospital = await Hospital.findById(id);
		if (!hospital) {
			return res.json({
				ok: false,
				msg: `Do not exist an hospital with id ${id}`,
			});
		}
		const b = { user: uid, ...req.body };
		const updateHospital = await Hospital.findByIdAndUpdate(id, b, {
			new: true,
		});
		res.json({ ok: true, updateHospital });
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Oops, we have some errors, please see logs',
		});
	}
};
const deleteHHospitals = async (req, res) => {
	const id = req.params.id;
	try {
		const hospital = await Hospital.findById(id);
		if (!hospital) {
			return res.status(404).json({
				ok: false,
				msg: `Do not exist an hospital with id ${id}`,
			});
		}
		const deleteHospital = await Hospital.findByIdAndDelete(id);
		res.status(200).json({
			ok: true,
			msg: `The hospital with id ${id} was deleted`,
		});
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Oops, we have some errors, please see logs',
		});
	}
};
module.exports = {
	getHHospitals,
	createHHospital,
	updatedHHospital,
	deleteHHospitals,
};
