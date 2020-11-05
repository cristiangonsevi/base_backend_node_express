const bcrypt = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');
const User = require('../models/user');
const getUser = async (req, res) => {
	const users = await User.find({}, 'name email rol google');
	res.json({ ok: true, users, uid: req.uid });
};
const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existEmail = await User.findOne({ email });
		if (existEmail != null) {
			return res.status(500).json({ ok: false, msg: 'The email exist' });
		}
		const user = new User(req.body);
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		await user.save();
		const token = await createJWT(user._id);
		res.json({ ok: true, user, token });
	} catch (error) {
		console.log(error);
		res.json({ ok: false, msg: 'Oops, we have some errors, please see logs' });
	}
};
const updateUser = async (req, res) => {
	const uid = req.params.id;
	const { password, google, email, ...body } = req.body;
	try {
		const user = await User.findById(uid);
		if (!user) {
			return res.status(404).json({
				ok: false,
				msg: `Do not exist an user with uid ${uid}`,
			});
		}
		if (user.email != email) {
			const existEmail = await User.findOne({ email });
			if (existEmail != null) {
				return res.status(500).json({ ok: false, msg: 'The email exist' });
			}
		}
		body.email = email;
		const updatedUser = await User.findByIdAndUpdate(uid, body, { new: true });
		res.json({ ok: true, updatedUser });
	} catch (error) {
		console.log(error);
		res.json({ ok: false, msg: 'Oops, we have some errors, please see logs' });
	}
};
const deleteUSer = async (req, res) => {
	const uid = req.params.id;
	try {
		const user = await User.findById(uid);
		if (!user) {
			return res.status(404).json({
				ok: false,
				msg: `Do not exist an user with uid ${uid}`,
			});
		}
		const deleteUser = await User.findByIdAndDelete(uid);
		res.status(200).json({
			ok: true,
			msg: `The user with uid ${uid} was deleted`,
		});
	} catch (error) {
		console.log(error);
		res.json({ ok: false, msg: 'Oops, we have some errors, please see logs' });
	}
};
module.exports = { getUser, createUser, updateUser, deleteUSer };
