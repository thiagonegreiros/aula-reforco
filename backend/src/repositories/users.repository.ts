import { User } from "@prisma/client";
import { prisma } from "../database/index";
import { CreateUserDto } from "../dtos/users/user.dto";

export class UsersRepository {
  async findAll() {
    return await prisma.user.findMany({});
  }

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateUserDto) {
    return await prisma.user.create({ data });
  }

  async update(data: User) {
    return await prisma.user.update({
      where: { id: data.id },
      data,
    });
  }

  async removeById(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
