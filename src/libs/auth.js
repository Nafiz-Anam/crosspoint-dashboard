// src/libs/auth.js

// Third-party Imports
import CredentialsProvider from 'next-auth/providers/credentials'
import authApiClient from '../services/authApiClient'

// Define the AuthOptions
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials || {}

        if (!email || !password) {
          throw new Error(JSON.stringify({ message: 'Email and password are required.' }))
        }

        try {
          const result = await authApiClient.login(email, password)
          return result
        } catch (error) {
          console.error('Login error:', error)
          const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.'
          throw new Error(JSON.stringify({ message: errorMessage }))
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  pages: {
    signIn: '/login'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role // Store as 'role' (singular)
        token.permissions = user.permissions || [] // Store permissions
        token.branchId = user.branchId // Store branchId
        token.accessToken = user.accessToken
        token.accessTokenExpires = user.accessTokenExpires
        token.refreshToken = user.refreshToken
        token.refreshTokenExpires = user.refreshTokenExpires
      }

      if (token.accessToken && token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      // Only try to refresh if we have a valid user session (not just a token)
      if (token.id && token.refreshToken && token.refreshTokenExpires && Date.now() < token.refreshTokenExpires) {
        try {
          const newToken = await authApiClient.refreshAccessToken()

          if (newToken) {
            // Update token with new access token
            return {
              ...token,
              accessToken: newToken,
              accessTokenExpires: authApiClient.getAccessTokenExpiry()
            }
          } else {
            return { ...token, error: 'RefreshAccessTokenError' }
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError)
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }

      return { ...token, error: 'RefreshAccessTokenError' }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.role = token.role // Store as 'role' (singular)
        session.user.permissions = token.permissions || [] // Include permissions
        session.user.branchId = token.branchId // Include branchId
      }
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}
