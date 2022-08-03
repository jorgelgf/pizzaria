import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
interface UseRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUSerService {
  async execute({ name, email, password }: UseRequest) {
    //email correct
    if (!email) throw new Error("E-mail incorrect");

    //email exist
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) throw new Error("User already exists");

    //Encrypt key
    const passwordHash = await hash(password, 8);

    //Create user
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      //show me info
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
}

export { CreateUSerService };
