"use client";

import { useSession } from "next-auth/react";
import StudentHome from "../components/home/StudentHome";
import LecturerHome from "../components/home/LecturerHome";

export default function HomePage() {
  const { data: session } = useSession();

  // Student View
  if (session?.userinfo.role === "student") {
    return <StudentHome />;
  }

  // Lecturer View
  if (session?.userinfo.role === "lecturer") {
    return <LecturerHome />;
  }

  return null;
}
