import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { connectToDatabase } from './mongoose';
import User from '@/models/user';
import type { Session, User as NextAuthUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await connectToDatabase();

                if (!credentials || !credentials.email || !credentials.password) return null;

                const user = await User.findOne({ email: credentials.email });
                if (!user) return null;

                const isValid = await compare(credentials.password, user.hashedPassword);
                if (!isValid) return null;

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image || null,
                } as NextAuthUser;
            },
        }),
    ],

    pages: {
        signIn: '/auth/signin',
        newUser: '/register',
    },

    callbacks: {
        async session({ session }: { session: Session }) {
            if (!session.user) {
                // Якщо user взагалі немає, створюємо дефолтного
                session.user = {
                    name: '',
                    email: '',
                    image: '/images/default-avatar.jpg',
                };
            } else if (!session.user.image) {
                session.user.image = '/images/default-avatar.jpg';
            }
            return session;
        },

        async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
            if (user) {
                token.id = user.id;
                token.image = user.image || null;
            }
            return token;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
