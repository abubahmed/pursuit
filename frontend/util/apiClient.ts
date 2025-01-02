import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/";
console.log(backendUrl);

const useApi = ({ useToken }: { useToken: boolean }) => {
  const { data: session, status } = useSession() as any;
  const token = session?.access_token;
  console.log(token);
  console.log(session);
  console.log(status);

  const apiInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: backendUrl,
      timeout: 100000,
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
