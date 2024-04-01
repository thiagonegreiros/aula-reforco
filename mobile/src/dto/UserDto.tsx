export enum Role {
  "STUDENT",
  "TEACHER",
  "ADMIN",
}

export type UserDto = {
  id: number;
  name: string;
  email: string;
  role: Role;
};
