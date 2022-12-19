import { User } from "@application/user/entities/user";

export abstract class AuthProviderRepository {
  abstract createJWT(user: User): Promise<string>;
}
