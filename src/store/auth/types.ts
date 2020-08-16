import { User } from '../user/types';

export interface AuthState {
  jwtToken: string | null;
  user: User | null;
  maskingUsernames: string[] | null;
}
