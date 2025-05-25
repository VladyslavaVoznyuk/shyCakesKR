import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/user';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Усі поля обовʼязкові', success: false }, { status: 400 });
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Користувач з таким email вже існує', success: false }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            hashedPassword,
            provider: 'credentials',
            image: null,
        });

        return NextResponse.json(
            { message: 'Користувач створений', success: true, user: { id: newUser._id, email: newUser.email, name: newUser.name } },
            { status: 201 }
        );
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ message: 'Помилка при реєстрації', success: false }, { status: 500 });
    }
}
