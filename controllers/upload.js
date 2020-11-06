const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/updateImage');
const fileUpload = async (req, res) => {
	const { type, id } = req.params;
	const typesAccepted = ['users', 'doctors', 'hospitals'];
	if (!typesAccepted.includes(type)) {
		return res.status(400).json({
			ok: false,
			msg: 'Type not found',
		});
	}
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg: 'Files not was upload',
		});
	}
	const fileTypeAccepted = ['png', 'jpeg', 'jpg', 'gif'];
	const file = req.files.image;
	let fileType = file.name.split('.');
	fileType = fileType[fileType.length - 1];
	if (!fileTypeAccepted.includes(fileType)) {
		return res.status(400).json({
			ok: false,
			msg: 'File extension not allowed',
		});
	}
	const changedFileName = `${uuidv4()}.${fileType}`;
	const path = 'uploads/' + type + '/' + changedFileName;
	file.mv(path, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ ok: false, msg: 'Failed to move resource' });
		}
		updateImage(type, id, path, changedFileName);
		res.json({ ok: true, msg: 'File was upload', changedFileName });
	});
};

const getImages = (req, res) => {
	const { type, photo } = req.params;
	const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);
	if (!fs.existsSync(pathImg)) {
		const pathImg = path.join(__dirname, `../uploads/notimage.png`);
		return res.sendFile(pathImg);
	}
	res.sendFile(pathImg);
};
module.exports = { fileUpload, getImages };
