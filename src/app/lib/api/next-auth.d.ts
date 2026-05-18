import NextAuth from "next-auth";
import type { User, UserObject } from "next-auth";
import type { Token } from "next-auth/jwt";

declare module "next-auth"{
    export interface UserObject {
        username: string;
        name: string;
        role_pk : number;
        user_id: number;
        id?: number; 
        role: string;
        email: string;
      }

    export interface User extends Token{
        userinfo: UserObject;
        accessExp: number;
        
    }

    export interface Session extends User{
        expires: string;
        error: string;
        provider?: string;
    }
}

declare module "next-auth/jwt" {

    export interface RefreshedToken {
        access: string;
      }
    export interface Token extends RefreshedToken {
        refresh: string;
        id_token?: string;
        provider?: string;
    }


    export interface DecodedJWT extends UserObject {
        token_type: string;
        exp: number;
        iat: number;
        jti: string;
      }
    /**
     * Returned by the `jwt` callback and `getToken`, when using JWT sessions
     */
    export interface JWT extends User {
      iat: number;
      jti: string;
      error: string;
      id_token?: string;
      provider?: string;
    }

  }