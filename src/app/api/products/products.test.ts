jest.mock('@/lib/mongodb', () => ({
    connectToDB: jest.fn(),
}));

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { connectToDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

describe('GET /api/products', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('повертає список продуктів при успішному запиті', async () => {
        const { GET } = await import('./route'); // Динамічний імпорт

        const mockProducts = [
            { _id: '1', name: 'Торт 1', price: 100 },
            { _id: '2', name: 'Торт 2', price: 200 },
        ];

        const mockCollection = {
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn().mockResolvedValue(mockProducts),
        };

        (connectToDB as jest.Mock).mockResolvedValue({
            collection: jest.fn().mockReturnValue(mockCollection),
        });

        (NextResponse.json as jest.Mock).mockImplementation((data, opts) => ({ data, opts }));

        const response = await GET();

        expect(connectToDB).toHaveBeenCalled();
        expect(mockCollection.find).toHaveBeenCalled();
        expect(mockCollection.toArray).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockProducts);
        expect(response).toEqual({ data: mockProducts, opts: undefined });
    });

    it('повертає помилку, якщо запит не вдався', async () => {
        const { GET } = await import('./route');

        const errorMessage = 'DB connection failed';
        (connectToDB as jest.Mock).mockRejectedValue(new Error(errorMessage));

        (NextResponse.json as jest.Mock).mockImplementation((data, opts) => ({ data, opts }));

        const response = await GET();

        expect(connectToDB).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
        expect(response).toEqual({ data: { error: 'Failed to fetch products' }, opts: { status: 500 } });
    });
});
