import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {JWT, Token } from "next-auth/jwt";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import jwt from 'jsonwebtoken';
import { authOptions } from "@/app/lib/api/authOptions";

// async function refreshAccessToken(token: JWT): Promise<JWT | null> {
//     try {
//       const data = { refresh: token.refresh };

//       const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_SIDE_URL+"/api/auth/refresh", data);
//       const refreshedToken: Token = response.data;

//       if (response.status !== 200) throw refreshedToken;

//       const decoded: any = jwt.decode(refreshedToken.access);
//       token.accessExp= decoded?.exp;
//       token.refresh = refreshedToken.refresh
//       token.access = refreshedToken.access

  
//       return {
//         ...token
//       } as JWT;
//     } catch (error) {
//       return {
//         ...token,
//         error: "RefreshAccessTokenError",
//       } as JWT;
//     }
//   }
  
// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "John Smith" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials:any) {
//             try {
//                 // check to see if email and password is there
//                 if(!credentials.username || !credentials.password) {
//                     throw new Error('Please enter an email and password')
//                 }
//                 const response = await fetch(process.env.NEXT_PUBLIC_SERVER_SIDE_URL+"/api/auth/login", {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(credentials)
//                 })
//                 if (response.status == 401) {
//                     throw new Error('Invalid Credentials');
//                 }
               
//                 const data: any= await response.json()
       
//                 const decoded:any = jwt.verify(data['data'].access, process.env.NEXTAUTH_SECRET as any)
//                 const token:any = {access:data['data'].access, refresh:data['data'].refresh}
//                 const user = {
//                     name: decoded!.name, 
//                     username: decoded!.username,
//                     role_pk: decoded!.role === "student" ? decoded!.student_pk : decoded!.lecturer_pk, // "user" or "admin
//                     role: decoded!.role,
//                     id: decoded!.user_id
//                 }
//                 return {userinfo:{...user}, ...token,accessExp:decoded!.exp}

//             } catch (error) {
//                 throw new Error(error as string);
//             }

//             }
//         }),  
//     ],
//     pages: {
//         signIn: 'auth/signin',
        
//     },

//     callbacks: {
//         async jwt({user,token,trigger}) {
//             if(trigger=="signIn"){
//                 return {...user} as JWT
//             }

//             if (Date.now() < token.accessExp * 1000) {
//                 return token;
//             }
//             return (await refreshAccessToken(token)) as JWT;
//         },
//            async session({ session, token}) {
//             session.userinfo = token.userinfo
//             session.access = token.access
//             session.refresh = token.refresh
//             session.accessExp = token.accessExp
//             session.error = token.error
        
//           return session
//         },
//       }
    
//   }

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }