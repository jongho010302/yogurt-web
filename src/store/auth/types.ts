import { User } from '../user/types';

export interface AuthState {
  user: User | null;
  jwtToken: string | null;
  maskingUsernames: string[] | null;
}
