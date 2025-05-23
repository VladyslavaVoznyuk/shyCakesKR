import { registerUser } from './registerUser';
import { connectToDB } from './mongodb';
import User from '@/models/user';
import bcrypt from 'bcrypt';

jest.mock('./mongodb', () => ({
    connectToDB: jest.fn()
}));

jest.mock('@/models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn()
}));

describe('registerUser', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('успішно реєструє нового користувача', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');
        const mockUser = { email: mockEmail, password: 'hashedPassword123' };
        (User.create as jest.Mock).mockResolvedValue(mockUser);

        const result = await registerUser(mockEmail, mockPassword);

        expect(connectToDB).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalledWith({ email: mockEmail });
        expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
        expect(User.create).toHaveBeenCalledWith({ email: mockEmail, hashedPassword: 'hashedPassword123' });
        expect(result).toBe(mockUser);
    });

    it('викидає помилку, якщо користувач вже існує', async () => {
        (User.findOne as jest.Mock).mockResolvedValue({ email: mockEmail });

        await expect(registerUser(mockEmail, mockPassword)).rejects.toThrow('Користувач з таким email вже існує');

        expect(User.create).not.toHaveBeenCalled();
        expect(bcrypt.hash).not.toHaveBeenCalled();
    });
});
