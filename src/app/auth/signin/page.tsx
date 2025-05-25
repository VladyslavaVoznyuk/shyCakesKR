import React, { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Завантаження...</div>}>
            <LoginForm />
        </Suspense>
    )
}
