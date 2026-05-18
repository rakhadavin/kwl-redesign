"use client";

import { useWebSocket } from "@/app/hooks/Websocket/useWebsocket";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";

export default function LecturerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = useParams();
  const { data: session } = useSession();

  const courseId = params?.id_course
    ? parseInt(params.id_course as string, 10)
    : undefined;
  const topicId = params?.id_topic
    ? parseInt(params.id_topic as string, 10)
    : undefined;

  const { activeStudents, isConnected } = useWebSocket(courseId, topicId);

  return <Fragment>{children}</Fragment>;
}
