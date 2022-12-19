import { User } from "@application/user/entities/user";
import { UserRepository } from "@application/user/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
