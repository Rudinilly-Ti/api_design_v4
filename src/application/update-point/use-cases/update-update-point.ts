import { UpdatePoint } from "../entities/update-point";
import { UpdatePointRepository } from "../repositories/update-point-repository";

interface UpdateUpdatePointRequest {
  id: string;
  name?: string;
  description?: string;
}

interface UpdateUpdatePointResponse {
  updatePoint: UpdatePoint;
}

export class UpdateUpdatePoint {
  constructor(private updatePointRepository: UpdatePointRepository) {}

  async execute({
    id,
    name,
    description,
  }: UpdateUpdatePointRequest): Promise<UpdateUpdatePointResponse> {
    const updatePointExists = await this.updatePointRepository.findById(id);

    if (!updatePointExists) {
      throw new Error("Update Point not found");
    }

    updatePointExists.name = name ?? updatePointExists.name;
    updatePointExists.description =
      description ?? updatePointExists.description;

    await this.updatePointRepository.save(updatePointExists);

    return { updatePoint: updatePointExists };
  }
}
