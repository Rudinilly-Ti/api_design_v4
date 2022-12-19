export abstract class HashProviderRepository {
  public abstract comparePassword(
    password: string,
    hash: string
  ): Promise<boolean>;
  public abstract hashPassword(password: string): Promise<string>;
}
