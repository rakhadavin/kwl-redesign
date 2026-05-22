"use client";

import { useSession } from "next-auth/react";
import StudentHome from "../components/home/StudentHome";
import LecturerHome from "../components/home/LecturerHome";
import Breadcrumb from "../components/navigation/Breadcrumb";

export default function HomePage() {
  const { data: session } = useSession();

  // Student View
  if (session?.userinfo.role === "student") {
    return (
      <>
        <Breadcrumb items={[{ label: "Home" }]} />
        <StudentHome />
      </>
    );
  }

  // Lecturer View
  if (session?.userinfo.role === "lecturer") {
    return (
      <>
        <Breadcrumb items={[{ label: "Home" }]} />
        <LecturerHome />
      </>
    );
  }

  return null;
}
