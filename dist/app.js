"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_2 = __importDefault(require("./config/passport"));
const app = (0, express_1.default)();
// Configura middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Configura express-session para manejar sesiones
app.use((0, express_session_1.default)({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));
// Inicializa Passport y las sesiones
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(passport_2.default);
// Manejador de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});
exports.default = app;
