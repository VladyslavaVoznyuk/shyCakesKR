import { GET } from './route';
import { connectToDatabase } from '@/lib/mongoose';
import Review from '@/models/Review';

jest.mock('@/lib/mongoose', () => ({
    connectToDatabase: jest.fn()
}));

jest.mock('@/models/Review', () => ({
    find: jest.fn(() => ({
        sort: jest.fn()
    }))
}));

describe('GET /api/reviews', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('повертає список відгуків у правильному порядку', async () => {
        const mockReviews = [{ id: 1, text: 'Смачно!' }, { id: 2, text: 'Найкращі торти' }];
        (Review.find as jest.Mock).mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockReviews)
        });

        const response = await GET();
        const data = await response.json();

        expect(connectToDatabase).toHaveBeenCalled();
        expect(Review.find).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(data).toEqual(mockReviews);
    });

    it('повертає 500 при помилці в базі даних', async () => {
        (Review.find as jest.Mock).mockReturnValue({
            sort: jest.fn().mockRejectedValue(new Error('DB Error'))
        });

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.message).toBe('Помилка при завантаженні відгуків');
    });
});
