import { BcryptProvider } from "@infra/providers/hash-provider/implementations/bcrypt-provider";
import { makeUser } from "@test/factories/user-factory";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { CreateUser } from "./create-user";

describe("Create User Use Case", () => {
  it("should be able to create a new user", async () => {
    const userRepository = new InMemoryUserRepository();
    const hashProvider = new BcryptProvider();
    const createUser = new CreateUser(userRepository, hashProvider);

    const { user } = await createUser.execute({
      username: "test",
      password: "test",
    });

    expect(userRepository.users[0]).toEqual(user);
  });

  it("should not be able to create a new user with an existing username", async () => {
    const userRepository = new InMemoryUserRepository();
    const hashProvider = new BcryptProvider();
    const createUser = new CreateUser(userRepository, hashProvider);

    const existent = await makeUser({
      username: "exist",
    });

    await userRepository.create(existent);

    expect(() => {
      return createUser.execute({
        username: "exist",
        password: "test",
      });
    }).rejects.toThrow();
  });
});
