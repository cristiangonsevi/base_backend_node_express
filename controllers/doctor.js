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
		res.json({
			ok: false,
			msg: 'Oops, we have some errors, please see logs',
		});
	}
};
const updatedDoctor = async (req, res) => {
	const id = req.params.id;
	const uid = req.uid;
	try {
		const doctor = await Doctor.findById(id);
		if (!doctor) {
			return res.json({
				ok: false,
				msg: `Do not exist a doctor with id ${id}`,
			});
		}
		const b = { user: uid, ...req.body };
		const updateDoctor = await Doctor.findByIdAndUpdate(id, b, { new: true });
		res.json({ ok: true, updateDoctor });
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Oops, we have some errors, please see logs',
		});
	}
};
const deleteDoctor = async (req, res) => {
	const id = req.params.id;
	try {
		const doctor = await Doctor.findById(id);
		if (!doctor) {
			return res.json({
				ok: false,
				msg: `Do not exist a doctor with id ${id}`,
			});
		}
		const deletedDoctor = await Doctor.findByIdAndDelete(id);
		res.json({ ok: true, msg: `The Doctor with id ${id} was deleted` });
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: 'Oops, we have some errors, please see logs',
		});
	}
};
module.exports = { getDoctors, createDoctor, updatedDoctor, deleteDoctor };
