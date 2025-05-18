import { connectToDB } from './mongodb'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export async function loginUser(email: string, password: string) {
    await connectToDB()

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Користувача не знайдено')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword)
    if (!isPasswordCorrect) {
        throw new Error('Невірний пароль')
    }

    return user
}
