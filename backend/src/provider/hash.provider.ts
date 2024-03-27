export class HashProvider {
  public async generateHash(password: string): Promise<string> {
    return Bun.password.hash(password);
  }

  public async compareHash(password: string, hash: string): Promise<boolean> {
    return Bun.password.verify(password, hash);
  }
}
