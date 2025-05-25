import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className="p-6 max-w-xl mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">Ви не увійшли</h1>
                <p>Будь ласка, авторизуйтесь, щоб побачити свій профіль.</p>
                <Link href="/auth/signin">
                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                        Авторизуватися
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Профіль користувача</h1>

            <div className="flex flex-col items-center gap-4">
                <Image
                    src={session.user?.image ?? '/default-avatar.png'}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="rounded-full"
                />
                <p className="text-xl font-semibold">{session.user?.name}</p>
                <p className="text-gray-600">{session.user?.email}</p>

                <SignOutButton />
            </div>
        </div>
    );
}
