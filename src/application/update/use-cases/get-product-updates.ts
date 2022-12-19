import { Update } from "../entities/update";
import { UpdateRepository } from "../repositories/update-repository";

interface GetProductUpdatesRequest {
  productId: string;
}

interface GetProductUpdatesResponse {
  updates: Update[];
}

export class GetProductUpdates {
  constructor(private updateRepository: UpdateRepository) {}

  async execute({
    productId,
  }: GetProductUpdatesRequest): Promise<GetProductUpdatesResponse> {
    const updates = await this.updateRepository.findManyByProductId(productId);

    return { updates };
  }
}
