export enum Role {
  "STUDENT",
  "TEACHER",
  "ADMIN",
}

export type UserDto = {
  id: number;
  name: string;
  email: string;
  born_date: string;
  role: Role;
};
