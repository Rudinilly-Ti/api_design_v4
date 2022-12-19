import { User } from "@application/user/entities/user";
import { UserRepository } from "@application/user/repositories/user-repository";
import { PrismaClient } from "@prisma/client";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: raw,
    });
  }
}
