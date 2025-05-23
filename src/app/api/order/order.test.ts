jest.mock('@/lib/mongodb', () => ({
    connectToDB: jest.fn(),
}));

jest.mock('@/models/Order', () => ({
    create: jest.fn(),
}));

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn((data, options) => ({ data, options })),
    },
}));

import { POST } from './route';
import { connectToDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

describe('POST /api/order', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('повертає успіх при правильних даних', async () => {
        const mockData = { name: 'Тестовий клієнт', items: ['Торт'], total: 300 };
        const mockRequest = {
            json: jest.fn().mockResolvedValue(mockData),
        } as unknown as Request;

        const response = await POST(mockRequest);

        expect(mockRequest.json).toHaveBeenCalled();
        expect(connectToDB).toHaveBeenCalled();
        expect(Order.create).toHaveBeenCalledWith(mockData);
        expect(NextResponse.json).toHaveBeenCalledWith({ success: true });
        expect(response).toEqual({ data: { success: true }, options: undefined });
    });

    it('повертає помилку при винятку', async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue({}),
        } as unknown as Request;

        (connectToDB as jest.Mock).mockImplementation(() => {
            throw new Error('DB Error');
        });

        const response = await POST(mockRequest);

        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: 'Помилка збереження замовлення' },
            { status: 500 }
        );
        expect(response).toEqual({
            data: { error: 'Помилка збереження замовлення' },
            options: { status: 500 },
        });
    });
});
