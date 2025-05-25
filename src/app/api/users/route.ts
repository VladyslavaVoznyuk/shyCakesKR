import { NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('shy_cakes');
        const users = await db.collection('users').find({}).toArray();

        return NextResponse.json(users);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 });
    }
}
