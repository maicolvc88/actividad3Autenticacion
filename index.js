const express = require('express');
const { getConnection} = require('./db/db-connection-mongo');
require('dotenv').config();
const cors = require('cors');
const AuthRoute = require('./router/auth');

const app = express();
const port = process.env.PORT;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/login', AuthRoute);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
});

