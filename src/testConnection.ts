import { DataSource } from 'typeorm';
import { User } from './models/User'; // Ajusta la ruta según tu estructura

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '7863',
  database: 'App',
  synchronize: true,
  logging: false,
  entities: [User],
});

dataSource.initialize()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos', error);
  });