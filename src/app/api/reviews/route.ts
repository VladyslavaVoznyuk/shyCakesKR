import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET() {
    await connectToDB();

    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ message: 'Помилка при завантаженні відгуків' }, { status: 500 });
    }
}