import { UserRole } from './user';

export type VuexData = {
  id: string| undefined;
  jwt: string | undefined;
  refreshToken: string | undefined;
  username: string | undefined;
  roles: UserRole[];
};

export type LoginData = {
  id: string|undefined;
  jwt: string | undefined;
  refreshToken: string | undefined;
  username: string | undefined;
  roles: UserRole[] | undefined;
}
