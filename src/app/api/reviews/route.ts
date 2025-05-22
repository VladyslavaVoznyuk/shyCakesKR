import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Review from '@/models/Review';

export async function GET() {
    await connectToDatabase();

    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        return NextResponse.json(reviews);
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: 'Помилка при завантаженні відгуків' }, { status: 500 });
    }
}