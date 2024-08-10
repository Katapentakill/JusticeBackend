"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepository = this.dataSource.getRepository(User_1.User);
    }
    registerUser(email, username, firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.findOne({ where: { email } });
            if (user) {
                throw new Error('El usuario ya existe');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            user = this.userRepository.create({
                email,
                username,
                firstname,
                lastname,
                password: hashedPassword,
            });
            yield this.userRepository.save(user);
            return user;
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { username } });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { id } });
        });
    }
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your_secret_key', {
                expiresIn: '1h', // Ajusta el tiempo de expiración según sea necesario
            });
            return { token };
        });
    }
}
exports.UserService = UserService;
