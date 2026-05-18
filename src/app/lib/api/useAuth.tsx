"use client";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// export function usePostAuth(locator: string, body: any, queryKey: string) {
//     const { data: session } = useSession();
//     const accessToken = session?.access;
//     const url = `${BASE_URL}${locator}`

//     return useQuery({
//         queryKey: [queryKey],
//         queryFn: async () => {
//             const { data }= await axios.post(url, body, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 }
//             })},
//         enabled: !!session
//     }

//     )

// }

export function useGetAuth(locator: string, queryKey: string, fetchOnce = false, enabled = true) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  const url = `${BASE_URL}${locator}`;


  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return data;
      } catch (error:any) {
        if (error?.response?.status === 401) {
          throw new Error("Unauthorized");
        }else if (error?.response?.status === 403) {
          throw new Error("Forbidden");
        }else {
          throw new Error("Terjadi kesalahan");
        }
        
         
      }
    },


    enabled: !!session && enabled,
    refetchOnWindowFocus: !fetchOnce, // Do not refetch on window focus if fetchOnce is true
    refetchOnReconnect: !fetchOnce, // Do not refetch on reconnect if fetchOnce is true
    staleTime: fetchOnce ? Infinity : 0, // Data never becomes stale if fetchOnce is true
    // refetchOnReconnect: false,
    // staleTime: 0, // Cuman fetch sekali, kalo data dinamis jangan pake ini
  });
}


export function useGetBarchartByType(locator: string, queryKey: string, type: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  const url = `${BASE_URL}${locator}${type}`;

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return data;
      } catch (error:any) {
        const err_message = error?.response?.data?.error;
        if (err_message) {
          throw new Error(err_message);
        } else {
          throw new Error("Terjadi kesalahan");
        }
        
         
      }

    },

    enabled: !!session && !!type,  // Only run the query if session exists and type is not empty
  });
}



export function useGetAuthWithTopicId(locator: string, queryKey: string, topicId: number) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  const url = `${BASE_URL}${locator}${topicId}`;

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

    enabled: !!session && topicId > 0,  // Only run the query if session exists and topicId is more than 0
  });
}

export function usePutAuth(locator: string, queryKey: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  var url = `${BASE_URL}${locator}`;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async ({ body, key }: any) => {
      url = key ? `${url}${key}` : url;
      const { data } = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },
  });
}

export function usePostAuth(locator: string, queryKey: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  var url = `${BASE_URL}${locator}`;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async ({ body, key }: any) => {
      url = key ? `${url}${key}` : url;
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },
  });
}

export function useDeleteAuth(locator: string, queryKey: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  var url = `${BASE_URL}${locator}`;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async ({ key }: any) => {
      url = key ? `${url}${key}` : url;
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },
  });
}

export function usePatchAuth(locator: string, queryKey: string) {
  const { data: session } = useSession();
  const accessToken = session?.access;
  var url = `${BASE_URL}${locator}`;

  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async ({ body, key }: any) => {
      url = key ? `${url}${key}` : url;
      const { data } = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    },
  });
}