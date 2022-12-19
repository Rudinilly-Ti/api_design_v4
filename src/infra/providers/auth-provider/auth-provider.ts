import { User } from "@application/user/entities/user";
import authConfig from "@infra/config/auth";
import jwt from "jsonwebtoken";
import { AuthProviderRepository } from "./repositories/auth-provider-repository";

export class AuthProvider implements AuthProviderRepository {
  public async createJWT(user: User): Promise<string> {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      authConfig.jwt.secret,
      {
        expiresIn: authConfig.jwt.expiresIn,
      }
    );
    return token;
  }
}
