import { DataSource } from 'typeorm';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
  private userRepository = this.dataSource.getRepository(User);

  constructor(private dataSource: DataSource) {}

  async registerUser(email: string, username: string, firstname: string, lastname: string, password: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = this.userRepository.create({
      email,
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async authenticateUser(email: string, password: string): Promise<{ token: string } | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your_secret_key', {
      expiresIn: '1h', // Ajusta el tiempo de expiración según sea necesario
    });

    return { token };
  }
}
