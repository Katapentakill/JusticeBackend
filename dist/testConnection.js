"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User"); // Ajusta la ruta según tu estructura
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '7863',
    database: 'App',
    synchronize: true,
    logging: false,
    entities: [User_1.User],
});
dataSource.initialize()
    .then(() => {
    console.log('Conexión a la base de datos exitosa');
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos', error);
});
