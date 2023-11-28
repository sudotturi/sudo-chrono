import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma'
import { compare, hash } from "bcryptjs";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // console.log('Please enter an email and password')
        // check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          console.log('Please enter an email and password')
          throw new Error('Please enter an email and password')
        }
        // console.log('Please enter an email and password')
        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        // console.log('Please enter an email and password')
        // if no user was found 
        if (!user || !user?.passwordHash) {
          console.log('No user found')
          throw new Error('No user found')
        }
        // const tt = await hash("test", 12);
        // console.log('Please enter an email and password : ' + tt)
        const passwordMatch = await compare(credentials.password, user?.passwordHash)
        // if password does not match
        if (!passwordMatch) {
          console.log('Incorrect password')
          throw new Error('Incorrect password')
        }

        // console.log(user)
        return { ...user };
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.user.username = token.username /* added */
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username /* added */
      }
      return Promise.resolve(token);
    },
  },
}

export default NextAuth(authOptions)