import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectToDatabase } from '@/lib/mongoose';
import { AddToCartButton } from '@/components/AddToCartButton';

interface PageProps {
    params: {
        slug: string;
    };
}

interface Product {
    slug: string;
    title: string;
    price: number;
    image: string;
    description?: string;
}

export default async function ProductPage({ params }: PageProps) {
    const db = await connectToDatabase();

    const product = (await db
        .collection('products')
        .findOne({ slug: params.slug })) as Product | null;

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
                    unoptimized
                />

                <div className="flex-1">
                    <p className="text-lg mb-4">{product.description || 'Опис відсутній'}</p>
                    <p className="text-2xl font-semibold text-cyan-700 mb-6">{product.price} ₴</p>

                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}
