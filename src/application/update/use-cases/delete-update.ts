import { UpdateRepository } from "../repositories/update-repository";

interface DeleteUpdateRequest {
  updateId: string;
}

type DeleteUpdateResponse = void;

export class DeleteUpdate {
  constructor(private updateRepository: UpdateRepository) {}

  async execute({
    updateId,
  }: DeleteUpdateRequest): Promise<DeleteUpdateResponse> {
    const updateExists = await this.updateRepository.findById(updateId);

    if (!updateExists) throw new Error("Update not found");

    await this.updateRepository.delete(updateId);
  }
}
