import {
  UpdatePoint,
  UpdatePointProps,
} from "@application/update-point/entities/update-point";

type Override = Partial<UpdatePointProps>;

export function makeUpdatePoint(override: Override = {}) {
  return new UpdatePoint({
    name: "Update Point Name",
    description: "Update Point Description",
    updateId: "example-id",
    ...override,
  });
}
