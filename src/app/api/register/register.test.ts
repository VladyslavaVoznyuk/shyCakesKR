import { POST } from './route';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';
import { hash } from 'bcrypt';

jest.mock('@/lib/mongodb', () => ({
    connectToDB: jest.fn()
}));

jest.mock('@/models/user', () => ({
    __esModule: true,
    default: {
        findOne: jest.fn(),
        create: jest.fn()
    }
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn()
}));

const createMockRequest = (body: any): globalThis.Request =>
    new globalThis.Request('http://localhost/api/register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });

describe('POST /api/register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('створює нового користувача при валідних даних', async () => {
        const req = createMockRequest({ name: 'Test', email: 'test@example.com', password: '123456' });

        (User.findOne as jest.Mock).mockResolvedValue(null);
        (hash as jest.Mock).mockResolvedValue('hashed123');
        const createdUser = { id: '1', name: 'Test', email: 'test@example.com' };
        (User.create as jest.Mock).mockResolvedValue(createdUser);

        const res = await POST(req);
        const data = await res.json();

        expect(connectToDB).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(hash).toHaveBeenCalledWith('123456', 10);
        expect(User.create).toHaveBeenCalledWith({
            name: 'Test',
            email: 'test@example.com',
            hashedPassword: 'hashed123',
            provider: 'credentials',
            image: null
        });
        expect(res.status).toBe(201);
        expect(data.message).toBe('Користувач створений');
        expect(data.user).toEqual(createdUser);
    });

    it('помилка якщо поля не заповнені', async () => {
        const req = createMockRequest({ email: '', password: '' });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.message).toBe('Усі поля обовʼязкові');
    });

    it('помилка якщо користувач вже існує', async () => {
        const req = createMockRequest({ name: 'Test', email: 'test@example.com', password: '123456' });

        (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(409);
        expect(data.message).toBe('Користувач з таким email вже існує');
    });

    it('повертає помилку при винятку', async () => {
        const req = createMockRequest({ name: 'Test', email: 'test@example.com', password: '123456' });

        (User.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data.message).toBe('Помилка при реєстрації');
    });
});
