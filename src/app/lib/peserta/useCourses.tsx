"use client";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export function useGetObjects(locator: string, queryKey: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  const url = `${BASE_URL}${locator}`;

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },

    enabled: !!session,
  });
}

export function useGetCourses(locator: string, queryKey: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  const student_id = session?.userinfo.role_pk;
  const url = `${BASE_URL}${locator}`;

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await axios.get(url + student_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },

    enabled: !!session,
  });
}

export function useGetAuthByStudentIdAndCourseId(
  locator: string,
  queryKey: string,
) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  const student_id = session?.userinfo.role_pk;
  const url = `${BASE_URL}${locator}`;

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await axios.get(url + student_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },

    enabled: !!session,
  });
}

export const useUnenroll = (locator: string, queryKey: string) => {
  const { data: session } = useSession();
  const accessToken = session?.access;
  var url = `${BASE_URL}${locator}`;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async ({ key, body }: any) => {
      url = key ? `${url}${key}` : url;
      const { data } = await axios.delete(url, {
        data: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },
  });
};

export function useGetObjectsWithStudent(locator: string, queryKey: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  const url = `${BASE_URL}${locator}`;
  const student_id = session?.userinfo.role_pk;

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await axios.get(url + student_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },

    enabled: !!session && !!student_id,
  });
}
