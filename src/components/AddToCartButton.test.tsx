import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AddToCartButton } from './AddToCartButton';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

// Моки
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('AddToCartButton', () => {
    const product = {
        slug: 'test-product',
        title: 'Test Product',
        price: 123,
        image: 'test-image.jpg',
    };

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('додає товар у localStorage, якщо користувач не авторизований, і викликає signIn', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        (signIn as jest.Mock).mockImplementation(() => {});

        const { getByText } = render(<AddToCartButton product={product} />);
        fireEvent.click(getByText('Замовити'));

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(cart).toHaveLength(1);
        expect(cart[0].slug).toBe(product.slug);

        expect(signIn).toHaveBeenCalledWith(undefined, { callbackUrl: '/checkout' });
    });

    it('додає товар у localStorage, якщо користувач авторизований, і переходить на /checkout', () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test' } } });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        const { getByText } = render(<AddToCartButton product={product} />);
        fireEvent.click(getByText('Замовити'));

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(cart).toHaveLength(1);
        expect(cart[0].slug).toBe(product.slug);

        expect(pushMock).toHaveBeenCalledWith('/checkout');
    });

    it('збільшує кількість товару, якщо він вже у кошику', () => {
        localStorage.setItem(
            'cart',
            JSON.stringify([{ slug: product.slug, quantity: 1, title: product.title, price: product.price, image: product.image }])
        );

        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test' } } });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        const { getByText } = render(<AddToCartButton product={product} />);
        fireEvent.click(getByText('Замовити'));

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toBe(2);

        expect(pushMock).toHaveBeenCalledWith('/checkout');
    });
});
