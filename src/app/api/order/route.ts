import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        await connectToDB();
        await Order.create(data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Помилка збереження замовлення' }, { status: 500 });
    }
}
