import { loginUser } from './loginUser';
import { connectToDB } from './mongodb';
import User from '@/models/user';
import bcrypt from 'bcrypt';

jest.mock('./mongodb', () => ({
    connectToDB: jest.fn()
}));

jest.mock('@/models/user', () => ({
    findOne: jest.fn()
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn()
}));

describe('loginUser', () => {
    const email = 'test@example.com';
    const password = 'password123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('успішно логінить користувача при правильному паролі', async () => {
        const mockUser = { email, hashedPassword: 'hashedPassword123' };
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const result = await loginUser(email, password);

        expect(connectToDB).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalledWith({ email });
        expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.hashedPassword);
        expect(result).toBe(mockUser);
    });

    it(' помилка, якщо користувача не знайдено', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        await expect(loginUser(email, password)).rejects.toThrow('Користувача не знайдено');

        expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it(' помилка, якщо пароль неправильний', async () => {
        const mockUser = { email, hashedPassword: 'hashedPassword123' };
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(loginUser(email, password)).rejects.toThrow('Невірний пароль');
    });
});
