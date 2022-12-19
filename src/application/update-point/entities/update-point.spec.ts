import { makeUpdatePoint } from "@test/factories/update-point-factory";

describe("UpdatePoint", () => {
  it("should create an update point", () => {
    const updatePoint = makeUpdatePoint();

    expect(updatePoint).toBeTruthy();
  });
});
