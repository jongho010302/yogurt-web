import { User } from '../user/types';

export interface AuthState {
  jwtToken: string;
  user: User | null;
}
