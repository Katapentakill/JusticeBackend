import { DataSource } from 'typeorm';
import { User } from '../models/User'; // Ajusta la ruta según tu estructura

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '7863',
  database: 'App',
  synchronize: true,  // Para desarrollo, sincroniza automáticamente
  logging: false,
  entities: [User],   // Agrega todas tus entidades aquí
});
