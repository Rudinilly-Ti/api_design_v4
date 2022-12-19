import { User, UserProps } from "@application/user/entities/user";
import { BcryptProvider } from "@infra/providers/hash-provider/implementations/bcrypt-provider";

type Override = Partial<UserProps>;

export async function makeUser(override: Override = {}) {
  return new User({
    username: override.username ?? "username",
    password: await new BcryptProvider().hashPassword(
      override.password ?? "password"
    ),
    createdAt: override.createdAt ?? undefined,
    products: override.products ?? undefined,
  });
}
