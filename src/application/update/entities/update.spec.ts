import { makeUpdate } from "@test/factories/update-factory";

describe("Update", () => {
  it("should create an update", () => {
    const update = makeUpdate();

    expect(update).toBeTruthy();
  });
});
