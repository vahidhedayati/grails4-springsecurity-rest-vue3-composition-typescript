export type User = {
  //username: string;
  id: string;
}

export interface CountryObject {
  name: string | undefined;
  updateUser: User | undefined;
  id: string | undefined;
  code: string | undefined;
  lastUpdated: string | undefined;
  error: string[] | undefined[];
}

export interface CountryListing {
  instanceList: CountryObject[] | undefined[];
  instanceTotal: number | string;
  numberOfPages: number | string;
}
