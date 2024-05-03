import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import User from '../models/User';
import UserService from './UserService';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../configs/jwt';



class AuthService {
    constructor(private userService: UserService) { }


    async authentication(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {

        const user = await this.userService.findByEmail(email);
        if (!user) return null;

        const isValidPassword = await bcrypt.compare(password, user.password || '');
        if (!isValidPassword) return null;

        const accessToken = jwt.sign({ userId: user.userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jwt.sign({ userId: user.userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });


        await this.userService.updateTokens(user.userId, accessToken, refreshToken);

        return { accessToken, refreshToken };
    }

    async register(email: string, password: string, fullname?: string): Promise<{ accessToken: string; refreshToken: string } | null> {

        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            // throw new Error('Email address is already registered');
            return null;
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await this.userService.create(email, hashedPassword, fullname);


        const accessToken = jwt.sign({ userId: user.userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jwt.sign({ userId: user.userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

        return { accessToken, refreshToken };
    }

    async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
   
            const user = await this.userService.findById(decoded.userId);

            if (!user || user.refreshToken !== refreshToken) {
                throw new Error('Invalid refresh token');
            }

            const accessToken = jwt.sign({ userId: user.userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
            const newRefreshToken = jwt.sign({ userId: user.userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
    
            return { accessToken, refreshToken: newRefreshToken };

        } catch (error) {
            return null;
        }
    }
}

export default AuthService;
