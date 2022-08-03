import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
//create method token
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //verify email
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("User/Password incorrect");

    //verify password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error("User/Password incorrect");

    //If ok, generation token for user
    const token = sign(
      {
        //payload
        name: user.name,
        email: user.email,
      },
      //secret
      process.env.JWT_SECRET,
      {
        //subject with Id, token expire 30 days
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return { id: user.id, name: user.name, email: user.email, token: token };
  }
}

export { AuthUserService };
