import { compare, hash } from "bcrypt";

export class HashProvider {
  public async generateHash(password: string): Promise<string> {
    return hash(password, 8);
  }

  public async compareHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
