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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const userService_1 = require("../services/userService");
const ormconfig_1 = require("../config/ormconfig");
const userService = new userService_1.UserService(ormconfig_1.AppDataSource);
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, firstname, lastname, password } = req.body;
    if (!email || !username || !firstname || !lastname || !password) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    try {
        const user = yield userService.registerUser(email, username, firstname, lastname, password);
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    try {
        const result = yield userService.authenticateUser(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const getProfile = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/google');
    }
    res.json(req.user);
};
exports.getProfile = getProfile;
