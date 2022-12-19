import { HashProviderRepository } from "@infra/providers/hash-provider/repositories/hash-provider-repository";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

interface CreateUserRequest {
  username: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProviderRepository
  ) {}

  async execute({
    username,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.hashProvider.hashPassword(password);

    const newUser = new User({ username, password: hashedPassword });

    await this.userRepository.create(newUser);

    return { user: newUser };
  }
}
