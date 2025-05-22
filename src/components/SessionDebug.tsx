'use client'

import { useSession } from 'next-auth/react'

export default function SessionDebug() {
    const { data: session, status } = useSession()

    console.log('Session:', session)

    return (
        <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">Debug: Статус сесії — {status}</p>
            {session ? (
                <pre className="text-sm mt-2">{JSON.stringify(session, null, 2)}</pre>
            ) : (
                <p className="text-red-500">Користувач не увійшов</p>
            )}
        </div>
    )
}
