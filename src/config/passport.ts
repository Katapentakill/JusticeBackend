import { Router, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const router = Router();

passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:5000/auth/google/callback'
},

(accessToken, refreshToken, profile, done) => {
    // Aquí es donde manejarás el perfil del usuario
    return done(null, profile);
}));

// Serializar y deserializar el usuario
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

// Ruta para autenticación con Google
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback de Google
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req: Request, res: Response) => {
        // Autenticación exitosa, redirigir al dashboard o donde quieras
        res.redirect('/dashboard');
    }
);

export default router;