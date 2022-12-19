import bcrypt from "bcrypt";
import { HashProviderRepository } from "../repositories/hash-provider-repository";

export class BcryptProvider implements HashProviderRepository {
  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
