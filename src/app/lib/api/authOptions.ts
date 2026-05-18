import axios from "axios";
import { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT, Token } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

interface DecodedToken {
  name: string;
  email: string;
  username: string;
  role: string;
  student_pk?: number;
  lecturer_pk?: number;
  user_id: number;
  exp: number;
}

interface UserInfo {
  email: string;
  name: string;
  username: string;
  role_pk: number;
  role: string;
  id: number;
}

async function refreshAccessToken(token: JWT): Promise<JWT | null> {
  try {
    const data = { refresh: token.refresh };

    const response = await axios.post(
      process.env.BACKEND_SERVER_URL + "/api/auth/refresh",
      data
    );
    const refreshedToken: Token = response.data;

    if (response.status !== 200) throw refreshedToken;

    const decoded: any = jwt.decode(refreshedToken.access);
    token.accessExp = decoded?.exp;
    token.refresh = refreshedToken.refresh;
    token.access = refreshedToken.access;

    return {
      ...token,
    } as JWT;
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    } as JWT;
  }
}

async function handleProviderAuth(providerUser: any): Promise<any> {
  try {
    const response = await fetch(
      process.env.BACKEND_SERVER_URL + "/api/auth/login/provider",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: providerUser.access_token,
          provider: providerUser.provider,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Keycloak authentication failed on backend");
    }

    const data = await response.json();
    const decoded: DecodedToken = jwt.verify(
      data.data.access,
      process.env.NEXTAUTH_SECRET!
    ) as DecodedToken;

    const userinfo: UserInfo = {
      email: decoded.email,
      name: decoded.name,
      username: decoded.username,
      role_pk:
        decoded.role === "student" ? decoded.student_pk! : decoded.lecturer_pk!,
      role: decoded.role,
      id: decoded.user_id,
    };

    return {
      userinfo,
      access: data.data.access,
      refresh: data.data.refresh,
      accessExp: decoded.exp,
      provider: "keycloak",
    };
  } catch (error) {
    console.error("Keycloak auth error:", error);
    throw new Error("Keycloak authentication failed");
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    KeycloakProvider({
      clientId: process.env.KEYCLOAK_AUDIENCE!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      authorization: {
        params: {
          scope: "openid email profile",
          audience: process.env.KEYCLOAK_AUDIENCE,
        },
      },
      checks: ["pkce", "state"],
      client: {
        id_token_signed_response_alg: "RS256",
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "John Smith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.username || !credentials.password) {
            throw new Error("Please enter an email and password");
          }

          const response = await fetch(
            process.env.BACKEND_SERVER_URL + "/api/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          console.log("Response status:", response.status);

          if (response.status == 401) {
            throw new Error("Invalid Credentials");
          }

          const data: any = await response.json();
          const decoded: any = jwt.verify(
            data["data"].access,
            process.env.NEXTAUTH_SECRET as any
          );
          const token: any = {
            access: data["data"].access,
            refresh: data["data"].refresh,
          };

          const user = {
            name: decoded!.name,
            username: decoded!.username,
            role_pk:
              decoded!.role === "student"
                ? decoded!.student_pk
                : decoded!.lecturer_pk,
            role: decoded!.role,
            id: decoded!.user_id,
          };

          return {
            userinfo: { ...user },
            ...token,
            accessExp: decoded!.exp,
            provider: "credentials",
          };
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  events: {
    async signOut({ token }) {
      // Jika user login dengan Keycloak, logout dari Keycloak juga
      if (token?.provider === "keycloak") {
        const logoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
        const params = new URLSearchParams({
          post_logout_redirect_uri:
            process.env.NEXTAUTH_URL || "http://localhost:3000",
          id_token_hint: token.id_token || "",
        });

        // Redirect ke Keycloak logout
        if (typeof window !== "undefined") {
          window.location.href = `${logoutUrl}?${params.toString()}`;
        }
      }
    },
  },

  callbacks: {
    async jwt({ user, token, account, trigger, profile, session }) {
      if (trigger === "signIn") {
        if (account?.provider === "google" && profile) {
          try {
            const googleAuthResult = await handleProviderAuth({
              access_token: account.access_token,
              provider: account.provider,
            });

            return { ...googleAuthResult } as JWT;
          } catch (error) {
            console.error("Google OAuth error:", error);
            return { ...token, error: "GoogleAuthError" } as JWT;
          }
        }

        if (account?.provider === "keycloak") {
          try {
            const keycloakAuthResult = await handleProviderAuth({
              access_token: account.access_token,
              provider: account.provider,
            });

            return { ...keycloakAuthResult } as JWT;
          } catch (error) {
            console.error("Keycloak token verification failed:", error);
            return {
              ...token,
              error: "KeycloakTokenError",
            } as JWT;
          }
        }

        if (user) {
          return { ...user } as unknown as JWT;
        }
      }

      if (trigger === "update") {
        const updatedProfile = await fetch(
          process.env.BACKEND_SERVER_URL +
            `/api/auth/${session?.userinfo.role}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        ).then((res) => res.json());

        const updatedUserinfo: UserInfo = {
          email: updatedProfile.user.email,
          name: updatedProfile.user.nama_lengkap,
          username: updatedProfile.user.username,
          role_pk:
            updatedProfile.user.role === "student"
              ? updatedProfile.user.student_id
              : updatedProfile.user.lecturer_id,
          role: updatedProfile.user.role,
          id: updatedProfile.user.id,
        };

        return {
          ...token,
          userinfo: updatedUserinfo,
          access: token.access,
          refresh: token.refresh,
          accessExp: token.accessExp,
        } as unknown as JWT;
      }

      if (Date.now() < token.accessExp * 1000) {
        return token;
      }

      return (await refreshAccessToken(token)) as JWT;
    },

    async session({ session, token }) {
      session.userinfo = token.userinfo;
      session.access = token.access;
      session.refresh = token.refresh;
      session.accessExp = token.accessExp;
      session.error = token.error;
      session.provider = token.provider; // Add provider info to session

      return session;
    },
  },
};
