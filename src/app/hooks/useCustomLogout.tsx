"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCustomLogout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const logout = async (redirectPath: string = "/") => {
    try {
      if (session?.provider === "keycloak") {
        // For Keycloak, we need to logout from both NextAuth and Keycloak
        const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
        const params = new URLSearchParams({
          post_logout_redirect_uri: `${window.location.origin}${redirectPath}`,
          client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "",
        });

        // Sign out from NextAuth first
        await signOut({ redirect: false });

        // Then redirect to Keycloak logout
        window.location.href = `${keycloakLogoutUrl}?${params.toString()}`;
      } else if (session?.provider === "google") {
        // For Google, we might need to revoke access
        await signOut({ redirect: false });

        // Optional: Revoke Google token
        // This will force re-authentication next time
        window.location.href = `https://accounts.google.com/logout`;
      } else {
        // For credentials and other providers
        await signOut({ callbackUrl: redirectPath });
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback to regular signOut
      await signOut({ callbackUrl: redirectPath });
    }
  };

  return { logout };
};

export default useCustomLogout;
