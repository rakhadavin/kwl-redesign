"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Spinner from "./components/spinner/spinner";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else if (status === "unauthenticated") {
    router.push("/auth/signin");
  } else if (status === "authenticated") {
    router.push("/home");
  }

  // You might want to return something here in case none of the conditions above are met
  return null;
}
