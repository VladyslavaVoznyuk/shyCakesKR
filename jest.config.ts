import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // 👈 alias '@/...' → 'src/...'
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    }

export default createJestConfig(customJestConfig)
