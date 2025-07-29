import { User } from '../entities/User';

export interface AuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
}