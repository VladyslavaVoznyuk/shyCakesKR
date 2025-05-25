import { connectToDB } from './mongodb'
import User from '@/models/user'
import { hash } from 'bcryptjs'
export async function registerUser(email: string, password: string) {
    await connectToDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error('Користувач з таким email вже існує')
    }

    const hashedPassword = await hash(password, 10)
    const user = await User.create({ email, password: hashedPassword })
    return user
}
