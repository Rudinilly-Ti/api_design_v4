import { Update, UPDATE_STATUS } from "../entities/update";
import { UpdateRepository } from "../repositories/update-repository";

interface CreateUpdateRequest {
  title: string;
  body: string;
  status: UPDATE_STATUS;
  productId: string;
  version?: string;
  asset?: string;
}

interface CreateUpdateResponse {
  update: Update;
}

export class CreateUpdate {
  constructor(private updateRepository: UpdateRepository) {}

  async execute(request: CreateUpdateRequest): Promise<CreateUpdateResponse> {
    const update = new Update(request);

    await this.updateRepository.create(update);

    return { update };
  }
}
