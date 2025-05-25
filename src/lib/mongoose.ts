import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface CachedMongoose {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
    _mongoose?: CachedMongoose;
};

const cached: CachedMongoose = globalWithMongoose._mongoose ?? {
    conn: null,
    promise: null,
};

globalWithMongoose._mongoose = cached;

export async function connectToDatabase(): Promise<Mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
