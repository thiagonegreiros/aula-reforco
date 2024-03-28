import { User } from "@prisma/client";
import { prisma } from "../database/index";
import { CreateUserDto } from "../dtos/users/user.dto";

export class UsersRepository {
  async findAll() {
    return prisma.user.findMany({});
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateUserDto) {
    return prisma.user.create({ data });
  }

  async update(data: User) {
    return prisma.user.update({
      where: { id: data.id },
      data,
    });
  }

  async removeById(id: number) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
