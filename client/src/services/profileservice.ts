import fetcher from "./fetcher";
import { ProfileState } from "@/types/profile";

export async function fetchProfile<TResult>(id: string | unknown): Promise<Response<TResult>> {

  const res = await fetcher<ProfileState>(
    "GET",
    "http://localhost:8080/api/driver/" + id

  );

  return {
    ok: res.status >= 200 && res.status < 400,
    status: res.status,
    headers: res.headers,
    data: res.data ? res.data as ProfileState : undefined,
  } as Response<TResult>;
}


export interface Response<TResult> {
  ok: boolean;
  status: number;
  headers: unknown;
  data: TResult | undefined;
}

export default { fetchProfile }