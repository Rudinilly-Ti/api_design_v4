import { Update, UPDATE_STATUS } from "../entities/update";
import { UpdateRepository } from "../repositories/update-repository";

interface UpdateUpdateRequest {
  updateId: string;
  title?: string;
  body?: string;
  status?: UPDATE_STATUS;
  version?: string;
  asset?: string;
}

interface UpdateUpdateResponse {
  update: Update;
}

export class UpdateUpdate {
  constructor(private updateRepository: UpdateRepository) {}

  async execute({
    updateId,
    title,
    body,
    status,
    version,
    asset,
  }: UpdateUpdateRequest): Promise<UpdateUpdateResponse> {
    const update = await this.updateRepository.findById(updateId);

    if (!update) throw new Error("Update not found.");

    update.title = title ?? update.title;
    update.body = body ?? update.body;
    update.status = status ?? update.status;
    update.version = version ?? update.version;
    update.asset = asset ?? update.asset;

    await this.updateRepository.save(update);

    return { update };
  }
}
