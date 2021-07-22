import { Response } from "@/types/fetcher";
import fetcher from "./fetcher";
import { CountryObject } from "@/types/country";


export async function getCountries<TResult>(params: string): Promise<Response<TResult>> {
  const res = await fetcher<CountryObject[]>(
    "GET",
    "/guest/countries" + params ,

  );
  return {
    ok: res.status >= 200 && res.status < 400,
    status: res.status,
    headers: res.headers,
    data: res.data ? res.data as CountryObject[] : undefined,
  } as Response<TResult>;
}

export async function createCountry<TResult>(country: CountryObject): Promise<Response<TResult>> {
  const res = await fetcher<CountryObject>(
    "POST",
    "/guest/countries",
    country
  );
  return {
    ok: res.status >= 200 && res.status < 400,
    status: res.status,
    headers: res.headers,
    data: res.data ? res.data as CountryObject : undefined,
  } as Response<TResult>;
}

export async function deleteCountry<TResult>(countryId: string|number): Promise<Response<TResult>> {
  const res = await fetcher<CountryObject>(
    "DELETE",
    "/guest/countries/"+countryId
  );
  return {
    ok: res.status >= 200 && res.status < 400,
    status: res.status,
    headers: res.headers,
    data: res.data ? res.data as CountryObject : undefined,
  } as Response<TResult>;
}


export async function patchCountry<TResult>(country: CountryObject): Promise<Response<TResult>> {
  const res = await fetcher<CountryObject>(
    "PATCH",
    "/guest/countries/"+country.id,
    country
  );
  return {
    ok: res.status >= 200 && res.status < 400,
    status: res.status,
    headers: res.headers,
    data: res.data ? res.data as CountryObject : undefined,
  } as Response<TResult>;
}

export default { getCountries, createCountry, patchCountry, deleteCountry }