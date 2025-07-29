import { AuthRepository } from '../../domain/interfaces/AuthRepository';
import { User } from '../../domain/entities/User';
import { prisma } from '../prisma/prismaClient';

export class PrismaAuthRepository implements AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(user.id, user.email ?? '', user.name ?? '', user.createdAt, user.updatedAt);
  }

  async createUser(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return new User(
      createdUser.id,
      createdUser.email ?? '',
      createdUser.name ?? '',
      createdUser.createdAt,
      createdUser.updatedAt
    );
  }
}
