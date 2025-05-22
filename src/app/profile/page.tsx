import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    console.log('ses', session)

    if (!session) {
        return <div>Ви не увійшли</div>;
    }

    return (
        <div>
            <h1>Профіль</h1>
            <p>Ім'я: {session.user?.name}</p>
            <p>Email: {session.user?.email}</p>
            <img src={session.user?.image ?? ''} alt="Avatar" width={64} />
        </div>
    );
}
