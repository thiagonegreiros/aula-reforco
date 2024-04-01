import { AuthenticateDTO } from "../dtos/auth/authenticate.dto";
import { HashProvider } from "../provider/hash.provider";
import { UsersHandler } from "./users.handler";
import jwt from "jsonwebtoken";

export class AuthenticateHandler {
  hashProvider = new HashProvider();
  userHandler = new UsersHandler();

  public async authenticate({ email, password }: AuthenticateDTO) {
    const userExists = await this.userHandler.findByEmail(email);

    if (!userExists) {
      return {
        message: "Invalid credentials",
        status: 500,
      };
    }

    const isPasswordValid = await this.hashProvider.compareHash(
      password,
      userExists.password,
    );

    if (!isPasswordValid) {
      return {
        message: "Invalid credentials",
        status: 500,
      };
    }

    return {
      access_token: jwt.sign(
        { sub: String(userExists.id), role: userExists.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
      ),
      user: {
        id: userExists.id,
        email: userExists.email,
        born_date: userExists.born_date,
        name: userExists.name,
        role: userExists.role,
      },
    };
  }
}
