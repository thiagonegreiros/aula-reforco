import { Role } from ".prisma/client";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  role: Role;
}

export function ensureAuthenticate(headers: any) {
  console.log(headers);
  const authToken = headers.authorization;
  if (!authToken) {
    return {
      message: "Token de autorização não foi provido.",
    };
  }

  const [, token] = authToken.split(" ");

  try {
    if (process.env.JWT_SECRET === undefined) {
      throw new Error("error on sync enviroment variables");
    }

    const decoded = verify(token, process.env.JWT_SECRET) as TokenPayload;

    headers.role = decoded.role;
  } catch (err: any) {
    return {
      message: err.message || "invalid token",
    };
  }
}
