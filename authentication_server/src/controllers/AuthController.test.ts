import { Request, Response } from 'express';
import UserService  from '../services/UserService'; 
import AuthService from '../services/AuthService';
import AuthController from './AuthController';
import { ApiResponse } from '../models/ApiResponse';


jest.mock('../services/AuthService');
jest.mock('../services/UserService');

describe('AuthController', () => {
    let userService: jest.Mocked<UserService>;
    let authService: jest.Mocked<AuthService>;
    let authController: AuthController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        userService = new UserService() as jest.Mocked<UserService>; // 
        authService = new AuthService(userService) as jest.Mocked<AuthService>; 
        authController = new AuthController(authService);
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    describe('login', () => {
        it('should return error if email or password is missing', async () => {
            req.body = {};
            await authController.login(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                new ApiResponse('Email and Password are required', 'error')
            );
        });

        it('should return error if email is invalid', async () => {
            req.body = { email: 'invalidemail', password: 'password' };
            await authController.login(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                new ApiResponse('Invalid email', 'error')
            );
        });


    });

    describe('register', () => {
        it('should return error if email, password, or fullname is missing', async () => {
            req.body = {};
            await authController.register(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                new ApiResponse('Email, Password and Fullname are required', 'error')
            );
        });

        it('should return error if email is invalid', async () => {
            req.body = { email: 'invalidemail', password: 'password', fullname: 'John Doe' };
            await authController.register(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                new ApiResponse('Invalid email', 'error')
            );
        });


    });

    describe('refreshToken', () => {
        it('should return error if refreshToken is missing', async () => {
            req.body = {};
            await authController.refreshToken(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                new ApiResponse('Refresh Token are required', 'error')
            );
        });


    });
});
