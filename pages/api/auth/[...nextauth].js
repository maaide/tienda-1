import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import Account from '../../../models/Account'
import bcrypt from 'bcrypt'
import { dbConnect } from '../../../database/db'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Contraseña', type: 'password', placeholder: '******' }
      },
      async authorize(credentials, req) {
        dbConnect()

        const userFound = await Account.findOne({ email: credentials?.email }).select('+password')
        if (!userFound) throw new Error('Credenciales invalidas')
      
        const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)
        if (!passwordMatch) throw new Error('Credenciales invalidas')

        return { email: userFound.email, _id: userFound._id }
      }
    })
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user
      return token
    },
    session({ session, token }) {
      session.user = token.user
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)