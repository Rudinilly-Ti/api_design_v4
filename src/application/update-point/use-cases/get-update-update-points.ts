import { UpdatePoint } from "../entities/update-point";
import { UpdatePointRepository } from "../repositories/update-point-repository";

interface GetUpdateUpdatePointsRequest {
  updateId: string;
}

interface GetUpdateUpdatePointsResponse {
  updatePoints: UpdatePoint[];
}

export class GetUpdateUpdatePoint {
  constructor(private updatePointRepository: UpdatePointRepository) {}

  async execute({
    updateId,
  }: GetUpdateUpdatePointsRequest): Promise<GetUpdateUpdatePointsResponse> {
    const updatePoints = await this.updatePointRepository.findManyByUpdateId(
      updateId
    );

    return { updatePoints };
  }
}
