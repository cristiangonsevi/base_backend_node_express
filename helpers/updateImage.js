const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const updateImage = async (type, id, path, changedFileName) => {
	try {
		const deleteOldImage = (path) => {
			if (fs.existsSync(path)) {
				fs.unlinkSync(path);
			}
		};
		let oldPath = '';
		switch (type) {
			case 'users':
				const user = await User.findById(id);
				if (!user) {
					return console.log('id not found');
				}
				oldPath = `./uploads/users/${user.img}`;
				deleteOldImage(oldPath);
				user.img = changedFileName;
				await user.save();
				return true;
				break;
			case 'doctors':
				const doctor = await Doctor.findById(id);
				if (!doctor) {
					return console.log('id not found');
				}
				oldPath = `./uploads/doctors/${doctor.img}`;
				deleteOldImage(oldPath);
				doctor.img = changedFileName;
				await doctor.save();
				return true;
				break;
			case 'hospitals':
				const hospital = await Hospital.findById(id);
				if (!hospital) {
					return console.log('id not found');
				}
				oldPath = `./uploads/hospitals/${hospital.img}`;
				deleteOldImage(oldPath);
				hospital.img = changedFileName;
				await hospital.save();
				return true;
				break;

			default:
				break;
		}
	} catch (error) {
		console.log(error);
	}
};
module.exports = { updateImage };
