const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
// * uso de middleware
app.use(cors());
app.use(express.json());
const { dbConnection } = require('./database/config');
//* conexion a la base de datos
dbConnection();
// Public directory
app.use(express.static('public'));
//* ruta del api v1
app.use('/api/v1', require('./routes/index'));

app.listen(process.env.PORT, () => {
	console.log(`Server on port ${process.env.PORT}`);
});
