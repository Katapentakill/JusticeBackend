"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const router = (0, express_1.Router)();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Aquí es donde manejarás el perfil del usuario
    return done(null, profile);
}));
// Serializar y deserializar el usuario
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// Ruta para autenticación con Google
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Callback de Google
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Autenticación exitosa, redirigir al dashboard o donde quieras
    res.redirect('/dashboard');
});
exports.default = router;
