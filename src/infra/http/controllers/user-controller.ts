import { CreateUser } from "@application/user/use-cases/create-user";
import { SignIn } from "@application/user/use-cases/sign-in";
import { UserPrismaRepository } from "@infra/database/prisma/repositories/user-prisma-repository";
import { PrismaService } from "@infra/database/prisma/prisma-service";
import { BcryptProvider } from "@infra/providers/hash-provider/implementations/bcrypt-provider";
import { AuthProvider } from "@infra/providers/auth-provider/auth-provider";
import { Request, Response } from "express";

export class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const create = new CreateUser(
      new UserPrismaRepository(new PrismaService()),
      new BcryptProvider()
    );

    const { username, password } = req.body;

    try {
      const { user } = await create.execute({ username, password });

      return res.status(201).json({ user });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async signInUser(req: Request, res: Response): Promise<Response> {
    const signIn = new SignIn({
      userRepository: new UserPrismaRepository(new PrismaService()),
      hashProvider: new BcryptProvider(),
      authProvider: new AuthProvider(),
    });

    const { username, password } = req.body;

    try {
      const { token } = await signIn.execute({ username, password });

      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
