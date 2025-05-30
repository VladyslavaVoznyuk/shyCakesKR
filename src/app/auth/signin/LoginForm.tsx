'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl,
        })

        if (res?.error) {
            setError('Невірний email або пароль')
        } else {
            setError(null)
            window.location.href = callbackUrl
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold text-center">Увійдіть для оформлення замовлення</h1>

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="Пароль"
                    className="w-full border px-4 py-2 rounded"
                />
                {error && <p className="text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Увійти
                </button>
            </form>

            <p className="text-center">або увійти через</p>
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => signIn('google', { callbackUrl })}
                    className="bg-white border px-4 py-2 rounded hover:bg-gray-100"
                >
                    Google
                </button>
                <button
                    onClick={() => signIn('github', { callbackUrl })}
                    className="bg-white border px-4 py-2 rounded hover:bg-gray-100"
                >
                    GitHub
                </button>
            </div>

            <p className="text-center text-sm">
                Немає акаунту? <a href="/register" className="text-blue-600 underline">Зареєструватися</a>
            </p>
        </div>
    )
}
