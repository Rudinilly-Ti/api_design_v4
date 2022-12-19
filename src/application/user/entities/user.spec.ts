import { makeUser } from "@test/factories/user-factory";

describe("User", () => {
  it("should create a user", async () => {
    const user = await makeUser();

    expect(user).toBeTruthy();
  });
});
