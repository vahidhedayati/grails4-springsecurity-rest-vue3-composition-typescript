import { User, UserRole } from './user'

export interface ProfileState {
  name: string | undefined;
  username: string | undefined;
  roles: UserRole[];
  id: string | undefined;
}

export interface MainState {
  version: string
  $localForage: any
}