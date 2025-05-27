import { NextResponse } from 'next/server';
import type { MongoClient } from 'mongodb';

jest.mock('@/lib/mongodb', () => ({
    clientPromise: {
        then: jest.fn(),
    },
}));

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

import { clientPromise } from '@/lib/mongodb';
import { GET } from './route';

const mockedClientPromise = clientPromise as unknown as {
    then: (cb: (client: MongoClient) => unknown) => unknown;
};

describe('GET /api/users', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('повертає список користувачів при успішному запиті', async () => {
        const mockUsers = [
            { _id: '1', name: 'User One' },
            { _id: '2', name: 'User Two' },
        ];

        const mockCollection = {
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn().mockResolvedValue(mockUsers),
        };
        const mockDb = {
            collection: jest.fn().mockReturnValue(mockCollection),
        };
        const mockClient = {
            db: jest.fn().mockReturnValue(mockDb),
        };

        mockedClientPromise.then = jest.fn((cb) => cb(mockClient as unknown as MongoClient));

        (NextResponse.json as jest.Mock).mockImplementation((data) => data);

        const response = await GET();

        expect(clientPromise.then).toHaveBeenCalled();
        expect(mockClient.db).toHaveBeenCalledWith('shy_cakes');
        expect(mockDb.collection).toHaveBeenCalledWith('users');
        expect(mockCollection.find).toHaveBeenCalled();
        expect(mockCollection.toArray).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockUsers);
        expect(response).toEqual(mockUsers);
    });

    it('повертає 500 при помилці підключення до БД', async () => {
        const error = new Error('Connection failed');
        mockedClientPromise.then = jest.fn(() => {
            throw error;
        });

        (NextResponse.json as jest.Mock).mockImplementation((data, opts) => ({ data, opts }));

        const response = await GET();

        expect(clientPromise.then).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: 'Failed to connect to database' },
            { status: 500 }
        );
        expect(response).toEqual({
            data: { error: 'Failed to connect to database' },
            opts: { status: 500 },
        });
    });
});
