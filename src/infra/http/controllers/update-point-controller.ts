import { CreateUpdatePoint } from "@application/update-point/use-cases/create-update-point";
import { DeleteUpdatePoint } from "@application/update-point/use-cases/delete-update-point";
import { GetUpdateUpdatePoint } from "@application/update-point/use-cases/get-update-update-points";
import { UpdateUpdatePoint } from "@application/update-point/use-cases/update-update-point";
import { PrismaService } from "@infra/database/prisma/prisma-service";
import { UpdatePointPrismaRepository } from "@infra/database/prisma/repositories/update-point-prisma-repository";
import { Request, Response } from "express";

export class UpdatePointController {
  public async createUpdatePoint(
    req: Request,
    res: Response
  ): Promise<Response> {
    const createUpdatePoint = new CreateUpdatePoint(
      new UpdatePointPrismaRepository(new PrismaService())
    );

    const { name, description, updateId } = req.body;

    try {
      const { updatePoint } = await createUpdatePoint.execute({
        name,
        description,
        updateId,
      });

      return res.status(201).json({ updatePoint });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async listUpdatePoints(
    req: Request,
    res: Response
  ): Promise<Response> {
    const listUpdatePoints = new GetUpdateUpdatePoint(
      new UpdatePointPrismaRepository(new PrismaService())
    );

    const { updateId } = req.params;

    try {
      const { updatePoints } = await listUpdatePoints.execute({
        updateId,
      });

      return res.status(200).json({ updatePoints });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async updateUpdatePoint(req: Request, res: Response) {
    const updateUpdatePoint = new UpdateUpdatePoint(
      new UpdatePointPrismaRepository(new PrismaService())
    );
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const { updatePoint } = await updateUpdatePoint.execute({
        id,
        name,
        description,
      });

      return res.status(200).json({ updatePoint });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async deleteUpdatePoint(req: Request, res: Response) {
    const deleteUpdatePoint = new DeleteUpdatePoint(
      new UpdatePointPrismaRepository(new PrismaService())
    );
    const { id } = req.params;

    try {
      await deleteUpdatePoint.execute({
        updatePointId: id,
      });

      return res.status(200).json({ message: "Update Point deleted" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
