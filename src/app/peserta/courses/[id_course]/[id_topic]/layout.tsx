"use client";

import { Fragment, useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useWebSocket } from "@/app/hooks/Websocket/useWebsocket";

export default function TopicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const pathname = usePathname();
  const { data: session } = useSession();

  const courseId = params?.id_course ? parseInt(params.id_course as string, 10) : undefined;
  const topicId = params?.id_topic ? parseInt(params.id_topic as string, 10) : undefined;

  const { notifyTopicView, isConnected } = useWebSocket(courseId, topicId);

  const previousTopicIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isConnected || !topicId || !session?.user) return;
    if (previousTopicIdRef.current !== topicId) {
      notifyTopicView(topicId);
      previousTopicIdRef.current = topicId;
    }
  }, [topicId, isConnected, session?.user, notifyTopicView]);

  useEffect(() => {
    return () => {
      previousTopicIdRef.current = undefined;
    };
  }, [pathname]);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
}
