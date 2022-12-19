import { UpdatePoint } from "../entities/update-point";
import { UpdatePointRepository } from "../repositories/update-point-repository";

interface CreateUpdatePointRequest {
  name: string;
  description: string;
  updateId: string;
}

interface UpdateUpdatePointResponse {
  updatePoint: UpdatePoint;
}

export class CreateUpdatePoint {
  constructor(private updatePointRepository: UpdatePointRepository) {}

  async execute(
    request: CreateUpdatePointRequest
  ): Promise<UpdateUpdatePointResponse> {
    const updatePoint = new UpdatePoint(request);

    await this.updatePointRepository.create(updatePoint);

    return { updatePoint };
  }
}
