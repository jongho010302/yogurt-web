import { User } from '../user/types';

export interface AuthState {
  user: User | null;
  maskingUsernames: string[] | null;
}
