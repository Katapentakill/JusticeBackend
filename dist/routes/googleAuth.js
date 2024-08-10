"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/googleAuth.ts
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// Ruta para iniciar sesión con Google
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Ruta de redirección después de la autenticación con Google
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Solo muestra el perfil del usuario autenticado
    res.send('Authenticated with Google! Profile: ' + JSON.stringify(req.user));
});
exports.default = router;
