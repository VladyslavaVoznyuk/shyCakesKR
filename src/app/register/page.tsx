'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isRegistered, setIsRegistered] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json()
        setMessage(data.message)

        if (res.status === 201 && data.success) {
            setIsRegistered(true)
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
                <input
                    type="text"
                    placeholder="Ім'я"
                    className="border p-2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="border p-2"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Зареєструватися
                </button>
            </form>

            {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}

            {isRegistered && (
                <div className="mt-6">
                    <p className="mb-2 text-green-600 font-semibold">Реєстрація пройшла успішно!</p>
                    <Link href="/auth/signin">
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Увійти
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}
