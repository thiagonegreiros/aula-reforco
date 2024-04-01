import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos/users/user.dto";
import { HashProvider } from "../provider/hash.provider";
import { AppError } from "../error/AppError";

export class UsersHandler {
  private usersRepository = new UsersRepository();
  private hashProvider = new HashProvider();

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  public async findById(id: number) {
    return this.usersRepository.findById(id);
  }

  public async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  public async add({ email, password, born_date, name, role }: CreateUserDto) {
    const user = await this.findByEmail(email);

    if (user) {
      throw new AppError("E-mail já cadastrado.", 500);
    }

    const passHashed = await this.hashProvider.generateHash(password);

    return this.usersRepository.create({
      email,
      password: passHashed,
      born_date,
      name,
      role,
    });
  }

  public async update(data: UpdateUserDto) {
    const user = await this.usersRepository.findById(data.id);
    let passHashed = "";

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (data.password !== undefined) {
      passHashed = await this.hashProvider.generateHash(data.password);
    } else {
      passHashed = user.password;
    }

    Object.assign(user, {
      email: data.email,
      password: passHashed,
      born_date: data.born_date,
      name: data.name,
      role: data.role,
    });

    return this.usersRepository.update(user);
  }

  public async remove(id: number) {
    await this.usersRepository.removeById(id);
  }
}
