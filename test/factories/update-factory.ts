import {
  Update,
  UPDATE_STATUS,
  UpdateProps,
} from "@application/update/entities/update";

type Override = Partial<UpdateProps>;

export function makeUpdate(override: Override = {}) {
  return new Update({
    title: "title",
    body: "body",
    status: UPDATE_STATUS.IN_PROGRESS,
    productId: "productId",
    version: "version",
    ...override,
  });
}
