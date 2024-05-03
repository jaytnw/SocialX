// src/services/UserService.ts
import User from '../models/User';
import prisma from './Database';

class UserService {
    async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(userId: string) {
        return prisma.user.findUnique({ where: { userId } });
    }

    async create(email: string, password: string, fullname?: string) {
        return prisma.user.create({ data: { email, password, fullname } });
    }

    async updateTokens(userId: string, accessToken: string, refreshToken: string) {
        await prisma.user.update({
            where: { userId },
            data: { accessToken, refreshToken },
        });
    }
}

export default UserService;
