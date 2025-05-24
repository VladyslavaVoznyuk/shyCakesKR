import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="max-w-2xl mx-auto text-center py-20 px-4">
            <h1 className="text-4xl font-bold mb-6 text-green-600">Дякуємо за замовлення!</h1>
            <p className="text-lg mb-4">Ми вже працюємо над вашим солодким шедевром 🍰</p>
            <p>Очікуйте лист на електронну пошту з підтвердженням замовлення.</p>

            <Link
                href="/products/"
                className="inline-block mt-8 bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition"
            >
                Назад до каталогу
            </Link>
        </div>
    );
}
