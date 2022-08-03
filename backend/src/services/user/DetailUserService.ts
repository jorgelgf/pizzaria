import prismaClient from "../../prisma";
class DetailUserService {
  async execute(user_id: string) {
    //find first id with name user_id
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { DetailUserService };
