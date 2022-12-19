import { User } from "@application/user/entities/user";
import { User as RawUser } from "@prisma/client";

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
    };
  }

  static toDomain(user: RawUser) {
    return new User(
      {
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
      },
      user.id
    );
  }
}
