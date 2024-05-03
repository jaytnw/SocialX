
import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { isValidEmail } from '../validators/EmailValidator';
import { ApiResponse } from '../models/ApiResponse';


class AuthController {

    constructor(private authService: AuthService) { 
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {

                const response = new ApiResponse('Email and Password are required', 'error');
                res.status(400).json(response);
                return;

            }

            if (!isValidEmail(email)) {

                const response = new ApiResponse('Invalid email', 'error');
                res.status(400).json(response);
                return;
            }

            const result = await this.authService.authentication(email, password);

            if (!result) {
                const response = new ApiResponse('Invalid email or password', 'error');
                res.status(401).json(response);
                return;

            } else {
                const response = new ApiResponse('Login Success', 'ok');
                response.accessToken = result.accessToken;
                response.refreshToken = result.refreshToken;
                res.status(200).json(response);
                return;
            }

        } catch (error: any) {
            console.log(error)
            const response = new ApiResponse('Internal Server Error', 'error');
            res.status(500).json(response);
            return;
        }
    }

    async register(req: Request, res: Response): Promise<void> {

        try {
            const { email, password, fullname } = req.body;

            if (!(email && password && fullname)) {

                const response = new ApiResponse('Email, Password and Fullname are required', 'error');
                res.status(400).json(response);
                return;

            }

            if (!isValidEmail(email)) {

                const response = new ApiResponse('Invalid email', 'error');
                res.status(400).json(response);
                return;
            }

            const result = await this.authService.register(email, password, fullname);

            if (!result) {
                const response = new ApiResponse('Email address is already registered', 'error');
                res.status(401).json(response);
                return;

            } else {
                const response = new ApiResponse('Register Success', 'ok');
                // response.accessToken = result.accessToken;
                // response.refreshToken = result.refreshToken;
                res.status(200).json(response);
                return;
            }
        } catch (error: any) {
            console.error(error)
            const response = new ApiResponse('Internal Server Error', 'error');
            res.status(500).json(response);
            return;
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;

            if (!(refreshToken)) {
                const result = new ApiResponse('Refresh Token are required', 'error');
                res.status(400).json(result);
                return;
            }

            const result = await this.authService.refreshTokens(refreshToken);
            if (!result) {
                const result = new ApiResponse('Invalid refresh token', 'error');
                res.status(401).json(result);
                return;

            } else {
                const response = new ApiResponse('Success', 'ok');
                response.accessToken = result.accessToken;
                response.refreshToken = result.refreshToken;
                res.status(200).json(response);
                return;
            }
        } catch (error: any) {
            console.log(error)
            const response = new ApiResponse('Internal Server Error', 'error');
            res.status(500).json(response);
            return;
        }
    }
}

export default AuthController;
