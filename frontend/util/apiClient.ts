import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/";
console.log(backendUrl);

const useApi = ({ useToken }: { useToken: boolean }) => {
  const { data: session, status } = useSession() as any;
  const token = session?.access_token;

  const apiInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: backendUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Authorization: token && useToken ? `Bearer ${token}` : "",
      },
    });
    return instance;
  }, [session]);

  return apiInstance;
};

export default useApi;
