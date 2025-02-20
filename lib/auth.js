import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma'
import { compare } from "bcryptjs";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  // Configure one or more authentication providers
  providers: [
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
        delete user['passwordHash']
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
      session.user.username = token.username
      session.user.roles = token.roles
      session.user.first = token.first
      session.user.modules = token.modules/* added */
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const roleModules = await prisma.roleModules.findMany({
          where: {
            role: user.roles
          },
          orderBy: {
            order: 'asc',
          },
        })
        token.id = user.id;
        token.first = user.isFirst;
        token.username = user.username
        token.roles = user.roles
        token.modules = roleModules.map((role) => { return role.module })
      }
      return Promise.resolve(token);
    },
  },
}