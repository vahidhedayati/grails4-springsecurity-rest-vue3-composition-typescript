import fetcher from "./fetcher";
import { Response } from "@/types/fetcher";
import { ProfileState } from "@/types/profile";

export async function fetchProfile<TResult>(id: string | unknown): Promise<Response<TResult>> {
  const res = await fetcher<ProfileState>(
    "GET",
    "/api/driver/" + id

  );
  return {
    ok: res.status >= 200 && res.status < 400,
    status: res.status,
    headers: res.headers,
    data: res.data ? res.data as ProfileState : undefined,
  } as Response<TResult>;
}

export default { fetchProfile }