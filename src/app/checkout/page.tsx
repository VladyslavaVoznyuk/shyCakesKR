'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

type CartItem = {
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

export default function CheckoutPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    if (status === 'loading') {
        return <p className="p-6 text-center">Завантаження...</p>;
    }

    if (status === 'unauthenticated') {
        signIn(undefined, { callbackUrl: '/checkout' });
        return null;
    }

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        alert('Дякуємо за замовлення!');
        clearCart();
        router.push('/');
    };

    if (cart.length === 0)
        return <p className="p-6 text-center">Ваш кошик порожній</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Кошик</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.slug} className="flex items-center gap-4 mb-4">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded"
                        />
                        <div className="flex-1">
                            <h2 className="font-semibold">{item.name}</h2>
                            <p>Ціна: {item.price} ₴</p>
                            <p>Кількість: {item.quantity}</p>
                            <p>Разом: {item.price * item.quantity} ₴</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-6 text-right text-xl font-semibold">
                Всього: {total} ₴
            </div>

            <div className="flex gap-4 mt-6 justify-center">
                <button
                    onClick={clearCart}
                    className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
                >
                    Очистити кошик
                </button>

                <button
                    onClick={handleCheckout}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                >
                    Оформити замовлення
                </button>
            </div>
        </div>
    );
}
