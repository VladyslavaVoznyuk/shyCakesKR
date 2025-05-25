import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'shy_cakes';
const options = {};

declare global {

    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export { clientPromise };

export async function connectToDB() {
    const client = await clientPromise;
    return client.db(process.env.MONGODB_DB);
}
