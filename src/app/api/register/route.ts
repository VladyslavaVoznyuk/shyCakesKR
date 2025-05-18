import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Усі поля обовʼязкові' }, { status: 400 });
        }

        await connectToDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Користувач з таким email вже існує' }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            hashedPassword,
            provider: 'credentials',
            image: null
        });

        return NextResponse.json({ message: 'Користувач створений', user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Помилка при реєстрації' }, { status: 500 });
    }
}
