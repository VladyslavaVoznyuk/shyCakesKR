'use client'
import { useState } from 'react'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()
        setMessage(data.message)
    }

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
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
                {message && <p className="text-sm text-gray-700">{message}</p>}
            </form>
        </div>
    )
}
