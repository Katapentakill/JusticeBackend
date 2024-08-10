import app from './app';
import { AppDataSource } from './config/ormconfig';

const PORT = process.env.PORT || 5000;

// Conecta a la base de datos y luego inicia el servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos', error);
  });