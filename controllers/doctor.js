const Doctor = require('../models/doctor');
const getDoctors = async (req, res) => {
	const doctors = await Doctor.find()
		.populate('user', 'name img')
		.populate('hospital', 'name');
	res.json({ ok: true, doctors });
};
const createDoctor = async (req, res) => {
	const uid = req.uid;
	try {
		const doctor = new Doctor({ user: uid, ...req.body });
		await doctor.save();
		res.json({ ok: true, doctor });
	} catch (error) {
		console.log(error);
		res.json({ ok: false, msg: 'Oops, we have some errors, please see logs' });
	}
};
const updatedDoctor = (req, res) => {
	res.json({ ok: true });
};
const deleteDoctor = (req, res) => {
	res.json({ ok: true });
};
module.exports = { getDoctors, createDoctor, updatedDoctor, deleteDoctor };
