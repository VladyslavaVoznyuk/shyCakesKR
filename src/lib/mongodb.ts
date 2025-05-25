import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {};

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

declare global {
    /* eslint-disable no-var */
    var _mongoClientPromise: Promise<MongoClient> | undefined;
    /* eslint-enable no-var */
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

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
    // Вказуємо базу даних через змінну середовища
    return client.db(process.env.MONGODB_DB);
}
