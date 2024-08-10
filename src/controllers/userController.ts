import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { AppDataSource } from '../config/ormconfig';

const userService = new UserService(AppDataSource);

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, firstname, lastname, password } = req.body;

  if (!email || !username || !firstname || !lastname || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const user = await userService.registerUser(email, username, firstname, lastname, password);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const result = await userService.authenticateUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.json(req.user);
};
