"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User"); // Ajusta la ruta según tu estructura
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '7863',
    database: 'App',
    synchronize: true,
    logging: false,
    entities: [User_1.User], // Agrega todas tus entidades aquí
});
