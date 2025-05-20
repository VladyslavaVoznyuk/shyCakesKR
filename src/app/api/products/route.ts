import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await connectToDB();
        const products = await db.collection('products').find().toArray();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
