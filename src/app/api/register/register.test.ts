
import { NextResponse } from 'next/server';

jest.mock('@/lib/mongoose', () => ({
    connectToDatabase: jest.fn(),
}));

jest.mock('@/models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
}));

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/user';
import { hash } from 'bcryptjs';
import { POST } from './route';


const mockRequest = (body: Record<string, unknown>): Request =>
    ({
        json: jest.fn().mockResolvedValue(body),
    } as unknown as Request);

describe('POST /api/auth/register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('повертає 400, якщо не всі поля надані', async () => {
        const req = mockRequest({ name: 'Name', email: '' }); // password відсутній

        await POST(req);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { message: 'Усі поля обовʼязкові', success: false },
            { status: 400 }
        );
    });

    it('повертає 409, якщо користувач з email вже існує', async () => {
        (connectToDatabase as jest.Mock).mockResolvedValue(undefined);
        (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

        const req = mockRequest({ name: 'Name', email: 'test@example.com', password: 'pass123' });

        await POST(req);

        expect(connectToDatabase).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(NextResponse.json).toHaveBeenCalledWith(
            { message: 'Користувач з таким email вже існує', success: false },
            { status: 409 }
        );
    });

    it('успішно створює нового користувача', async () => {
        (connectToDatabase as jest.Mock).mockResolvedValue(undefined);
        (User.findOne as jest.Mock).mockResolvedValue(null);
        (hash as jest.Mock).mockResolvedValue('hashedPassword123');
        const createdUser = { _id: 'userId123', email: 'test@example.com', name: 'Name' };
        (User.create as jest.Mock).mockResolvedValue(createdUser);

        const req = mockRequest({ name: 'Name', email: 'test@example.com', password: 'pass123' });

        await POST(req);

        expect(connectToDatabase).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(hash).toHaveBeenCalledWith('pass123', 10);
        expect(User.create).toHaveBeenCalledWith({
            name: 'Name',
            email: 'test@example.com',
            hashedPassword: 'hashedPassword123',
            provider: 'credentials',
            image: null,
        });

        expect(NextResponse.json).toHaveBeenCalledWith(
            {
                message: 'Користувач створений',
                success: true,
                user: {
                    id: createdUser._id,
                    email: createdUser.email,
                    name: createdUser.name,
                },
            },
            { status: 201 }
        );
    });

    it('повертає 500, якщо сталася помилка', async () => {
        const error = new Error('DB failure');
        (connectToDatabase as jest.Mock).mockRejectedValue(error);

        const req = mockRequest({ name: 'Name', email: 'test@example.com', password: 'pass123' });

        await POST(req);

        expect(connectToDatabase).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(
            { message: 'Помилка при реєстрації', success: false },
            { status: 500 }
        );
    });
});
