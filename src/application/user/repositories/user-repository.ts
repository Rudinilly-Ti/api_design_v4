import { User } from "../entities/user";

export abstract class UserRepository {
  abstract findByUsername(username: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
}
