import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectToDB } from '@/lib/mongodb';
import { AddToCartButton } from '@/components/AddToCartButton';

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function ProductPage({ params }: PageProps) {
    const db = await connectToDB();
    const product = await db.collection('products').findOne({ slug: params.slug });

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
                    <p className="text-2xl font-semibold text-cyan-700 mb-6">{product.price} ₴ </p>

                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}
