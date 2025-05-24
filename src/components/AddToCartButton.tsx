'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AddToCartButton({ product }: { product: any }) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleOrder = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingIndex = cart.findIndex((item: any) => item.slug === product.slug);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ slug: product.slug, title: product.title, price: product.price, image: product.image, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        if (session) {
            router.push('/checkout');
        } else {
            signIn(undefined, { callbackUrl: '/checkout' });
        }
    };

    return (
        <button
            onClick={handleOrder}
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition"
        >
            Замовити
        </button>
    );
}
