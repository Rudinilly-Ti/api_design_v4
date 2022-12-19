import { AuthProvider } from "@infra/providers/auth-provider/auth-provider";
import { BcryptProvider } from "@infra/providers/hash-provider/implementations/bcrypt-provider";
import { makeUser } from "@test/factories/user-factory";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { SignIn } from "./sign-in";
import * as dotenv from "dotenv";
dotenv.config();

describe("Sign In Use Case", () => {
  it("should be able to sign in a user", async () => {
    const userRepository = new InMemoryUserRepository();
    const hashProvider = new BcryptProvider();
    const authProvider = new AuthProvider();

    const signIn = new SignIn({
      userRepository,
      hashProvider,
      authProvider,
    });

    const user = await makeUser({
      username: "Jhon Doe",
      password: "123456",
    });

    await userRepository.create(user);

    const { token } = await signIn.execute({
      username: "Jhon Doe",
      password: "123456",
    });

    expect(token).toBeTruthy();
  });

  it("should not be able to sign in a user with invalid password", async () => {
    const userRepository = new InMemoryUserRepository();
    const hashProvider = new BcryptProvider();
    const authProvider = new AuthProvider();

    const signIn = new SignIn({
      userRepository,
      hashProvider,
      authProvider,
    });

    const user = await makeUser({
      username: "Jhon Doe",
      password: "123456",
    });

    await userRepository.create(user);

    expect(() => {
      return signIn.execute({
        username: "Jhon Doe",
        password: "wrongpassword",
      });
    }).rejects.toThrow("Invalid username or password");
  });

  it("should not be able to sign in a user with invalid username", async () => {
    const userRepository = new InMemoryUserRepository();
    const hashProvider = new BcryptProvider();
    const authProvider = new AuthProvider();

    const signIn = new SignIn({
      userRepository,
      hashProvider,
      authProvider,
    });

    expect(() => {
      return signIn.execute({
        username: "Jhon Doe",
        password: "123456",
      });
    }).rejects.toThrow("User not found");
  });
});
