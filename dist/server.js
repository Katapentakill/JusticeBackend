"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const ormconfig_1 = require("./config/ormconfig");
const PORT = process.env.PORT || 5000;
// Conecta a la base de datos y luego inicia el servidor
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log('Conectado a la base de datos');
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos', error);
});
