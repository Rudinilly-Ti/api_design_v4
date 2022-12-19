import { CreateUpdate } from "@application/update/use-cases/create-update";
import { DeleteUpdate } from "@application/update/use-cases/delete-update";
import { GetProductUpdates } from "@application/update/use-cases/get-product-updates";
import { UpdateUpdate } from "@application/update/use-cases/update-update";
import { PrismaUpdateMapper } from "@infra/database/prisma/mappers/prisma-update-mapper";
import { PrismaService } from "@infra/database/prisma/prisma-service";
import { UpdatePrismaRepository } from "@infra/database/prisma/repositories/update-prisma-repository";
import { Request, Response } from "express";

export class UpdateController {
  public async createUpdate(req: Request, res: Response): Promise<Response> {
    const createUpdate = new CreateUpdate(
      new UpdatePrismaRepository(new PrismaService())
    );
    const { title, body, status, asset, version, productId } = req.body;

    try {
      const { update } = await createUpdate.execute({
        title,
        body,
        status,
        asset,
        version,
        productId,
      });

      return res.status(200).json({ update });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async listUpdates(req: Request, res: Response): Promise<Response> {
    const getProductUpdates = new GetProductUpdates(
      new UpdatePrismaRepository(new PrismaService())
    );

    const { productId } = req.params;
    try {
      const { updates } = await getProductUpdates.execute({
        productId: productId,
      });

      return res.status(200).json({ updates });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async updateUpdate(req: Request, res: Response): Promise<Response> {
    const updateUpdate = new UpdateUpdate(
      new UpdatePrismaRepository(new PrismaService())
    );

    const { id } = req.params;
    const { title, body, status, asset, version } = req.body;

    try {
      const { update } = await updateUpdate.execute({
        updateId: id,
        title,
        body,
        status,
        asset,
        version,
      });

      return res.status(200).json({ update });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async deleteUpdate(req: Request, res: Response): Promise<Response> {
    const deleteUpdate = new DeleteUpdate(
      new UpdatePrismaRepository(new PrismaService())
    );

    const { id } = req.params;

    try {
      await deleteUpdate.execute({ updateId: id });

      return res.status(200).json({ message: "Update deleted" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
