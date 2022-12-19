import { UpdatePoint } from "../entities/update-point";
import { UpdatePointRepository } from "../repositories/update-point-repository";

interface DeleteUpdatePointRequest {
  updatePointId: string;
}

type DeleteUpdatePointResponse = void;

export class DeleteUpdatePoint {
  constructor(private updatePointRepository: UpdatePointRepository) {}

  async execute({
    updatePointId,
  }: DeleteUpdatePointRequest): Promise<DeleteUpdatePointResponse> {
    const updatePointExists = await this.updatePointRepository.findById(
      updatePointId
    );

    if (!updatePointExists) {
      throw new Error("Update Point not found");
    }

    await this.updatePointRepository.delete(updatePointId);
  }
}
