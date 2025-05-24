'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition"
        >
            Вийти з акаунту
        </button>
    );
}
