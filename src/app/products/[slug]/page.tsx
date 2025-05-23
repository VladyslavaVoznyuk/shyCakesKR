import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectToDB } from '@/lib/mongodb';

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const db = await connectToDB();
    const product = await db.collection('products').findOne({ slug });

    if (!product) return notFound();

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">{product.title}</h1>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="rounded-xl"
                />

                <div className="flex-1">
                    <p className="text-lg mb-4">{product.description}</p>
                    <p className="text-2xl font-semibold text-cyan-700 mb-6">{product.price} ₴ / кг</p>

                    <form action="/auth">
                        <button
                            type="submit"
                            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition"
                        >
                            Замовити
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
