import { AuthProviderRepository } from "@infra/providers/auth-provider/repositories/auth-provider-repository";
import { HashProviderRepository } from "@infra/providers/hash-provider/repositories/hash-provider-repository";
import { UserRepository } from "../repositories/user-repository";

interface SignInRequest {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

interface Props {
  userRepository: UserRepository;
  hashProvider: HashProviderRepository;
  authProvider: AuthProviderRepository;
}

export class SignIn {
  private userRepository: UserRepository;
  private hashProvider: HashProviderRepository;
  private authProvider: AuthProviderRepository;

  constructor({ userRepository, hashProvider, authProvider }: Props) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.authProvider = authProvider;
  }

  async execute({
    username,
    password,
  }: SignInRequest): Promise<SignInResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await this.hashProvider.comparePassword(
      password,
      user.password
    );

    if (!isValid) {
      throw new Error("Invalid username or password");
    }

    const token = await this.authProvider.createJWT(user);

    return { token };
  }
}
