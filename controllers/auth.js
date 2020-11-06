const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');
const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ ok: false, msg: 'Wrong credentials' });
		}
		const validPassword = bcrypt.compareSync(password, user.password);
		if (validPassword == false) {
			return res.status(400).json({ ok: false, msg: 'Wrong credentials' });
		}
		const token = await createJWT(user._id);
		res.json({ ok: true, token });
	} catch (error) {
		console.log(error);
		res.json({ ok: false, msg: 'Oops, we have some errors, please see logs' });
	}
};

const googleSingIn = async (req, res) => {
	const tokenGoogle = req.body.token;
	try {
		const { name, email, picture } = await googleVerify(tokenGoogle);
		const userExist = await User.findOne({ email });
		let user;
		if (!userExist) {
			user = new User({
				name,
				email,
				password: '@@@',
				img: picture,
				google: true,
			});
		} else {
			user = userExist;
			user.img = picture;
			user.google = true;
		}
		await user.save();
		const token = await createJWT(user._id);
		res.json({ ok: true, token });
	} catch (error) {
		console.log(error);
		res.json({ ok: false, msg: 'Oops, we have some errors, please see logs' });
	}
};
module.exports = { login, googleSingIn };
