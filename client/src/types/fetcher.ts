
export type Headers = {
  'Content-Type': string;
  Authorization?: string;
}
export interface Response<TResult> {
  ok: boolean;
  status: number;
  headers: unknown;
  data: TResult | undefined;
}