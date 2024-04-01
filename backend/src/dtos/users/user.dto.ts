import { Role } from "@prisma/client";

export interface CreateUserDto {
  email: string;
  password: string;
  born_date: Date;
  name: string;
  role?: Role;
}

export interface UpdateUserDto {
  id: number;
  email: string;
  password: string;
  born_date: Date;
  name: string;
  role?: Role;
}
