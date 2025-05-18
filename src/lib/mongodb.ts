import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

export const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) return

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'shy_cakes',
        })
        console.log('✅ Connected to MongoDB')
    } catch (error) {
        console.error('❌ DB connection error:', error)
    }
}
