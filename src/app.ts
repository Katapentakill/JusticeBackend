import express from 'express';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/auth';
import { Request, Response, NextFunction } from 'express';
import route from './config/passport';
const app = express();

// Configura middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura express-session para manejar sesiones
app.use(session({
  secret: 'your_secret_key', // Cambia esto a una clave secreta segura en producción
  resave: false,
  saveUninitialized: true,
}));

// Inicializa Passport y las sesiones
app.use(passport.initialize());
app.use(passport.session());

app.use(route);

// Manejador de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejador de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

export default app;