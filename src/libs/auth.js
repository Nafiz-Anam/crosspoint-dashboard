// src/libs/auth.js

// Third-party Imports
import CredentialsProvider from 'next-auth/providers/credentials';

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
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error(JSON.stringify({ message: 'Email and password are required.' }));
        }

        try {
          const loginApiUrl = `${process.env.API_URL}/auth/login`;
          const res = await fetch(loginApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web'
            },
            body: JSON.stringify({ email, password })
          });

          const responseBody = await res.json();
          console.log('API Login Response:', responseBody);

          // --- IMPORTANT: Extract Refresh Token from Set-Cookie header ---
          const setCookieHeader = res.headers.get('Set-Cookie');
          let refreshToken = null;
          let refreshTokenExpires = null;

          if (setCookieHeader) {
            const cookieStrings = setCookieHeader.split(/, (?=[^;]+; HttpOnly])/g);

            for (const cookieStr of cookieStrings) {
              if (cookieStr.startsWith('refreshToken=')) {
                const parts = cookieStr.split(';');
                refreshToken = parts[0].split('=')[1];

                const expiresPart = parts.find(p => p.trim().startsWith('Expires='));
                if (expiresPart) {
                  const expiresValue = expiresPart.split('=')[1];
                  refreshTokenExpires = new Date(expiresValue).getTime();
                }
                break;
              }
            }
          }

          if (!res.ok) {
            const errorMessage = responseBody.message || `API error: ${res.status}`;
            throw new Error(JSON.stringify({ message: errorMessage }));
          }

          // Check if the API response indicates success and contains the expected data structure
          if (
            responseBody.success &&
            responseBody.data &&
            responseBody.data.user &&
            responseBody.data.user.id &&
            responseBody.data.accessToken &&
            responseBody.data.accessToken.token && // <--- New check for accessToken.token
            responseBody.data.accessToken.expires // <--- New check for accessToken.expires
          ) {
            const user = responseBody.data.user;
            const accessTokenData = responseBody.data.accessToken; // Access the accessToken object

            // Calculate access token expiry using the provided 'expires' field
            const accessTokenExpires = new Date(accessTokenData.expires).getTime();

            return {
              id: user.id,
              email: user.email,
              name: user.name || user.email,
              roles: [user.role],
              accessToken: accessTokenData.token, // <--- Access the token property
              accessTokenExpires: accessTokenExpires, // <--- Use the precise expiry
              refreshToken: refreshToken,
              refreshTokenExpires: refreshTokenExpires,
            };
          }

          throw new Error(
            JSON.stringify({ message: 'Authentication successful, but API response data is incomplete or malformed.' })
          );
        } catch (e) {
          console.error('Error during NextAuth authorize:', e);
          if (typeof e.message === 'string' && e.message.startsWith('{')) {
            throw e;
          }
          throw new Error(JSON.stringify({ message: e.message || 'An unexpected error occurred during login.' }));
        }
      }
    }),
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
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.refreshToken = user.refreshToken;
        token.refreshTokenExpires = user.refreshTokenExpires;
      }

      if (token.accessToken && token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      if (token.refreshToken && token.refreshTokenExpires && Date.now() < token.refreshTokenExpires) {
        try {
          const refreshApiUrl = `${process.env.API_URL}/auth/refresh-token`;
          const refreshRes = await fetch(refreshApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web'
            },
            body: JSON.stringify({ refreshToken: token.refreshToken })
          });

          const refreshData = await refreshRes.json();

          if (!refreshRes.ok) {
            const errorMessage = refreshData.message || `Token refresh failed: ${refreshRes.status}`;
            console.error('Token refresh failed:', errorMessage);
            return { ...token, error: "RefreshAccessTokenError" };
          }

          // Assuming refreshData has a similar structure for the new access token:
          // { accessToken: { token: "...", expires: "..." } }
          // OR if it's flat: { accessToken: "...", expires_in: ... }
          // If your refresh API returns the new `accessToken` and `expires` in a nested object:
          if (refreshData.accessToken && refreshData.accessToken.token && refreshData.accessToken.expires) {
              token.accessToken = refreshData.accessToken.token;
              token.accessTokenExpires = new Date(refreshData.accessToken.expires).getTime();
          } else if (refreshData.accessToken && refreshData.expires_in) { // If flat with expires_in
              token.accessToken = refreshData.accessToken;
              token.accessTokenExpires = Date.now() + refreshData.expires_in * 1000;
          } else { // Fallback if refresh API response structure is unexpected
              console.warn("Refresh API response did not contain expected accessToken and expiry format.");
              return { ...token, error: "RefreshAccessTokenError" };
          }


          // If your refresh API also issues a new refresh token (and its expiry), update them here:
          // const newSetCookieHeader = refreshRes.headers.get('Set-Cookie');
          // if (newSetCookieHeader) { /* ... parse and update token.refreshToken and token.refreshTokenExpires ... */ }

          return token;

        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return { ...token, error: "RefreshAccessTokenError" };
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.roles = token.roles;
      }
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};