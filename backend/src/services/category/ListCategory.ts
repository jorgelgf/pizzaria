import prismaClient from "../../prisma";

class ListCategoryService {
  async execute() {
    //Only ID and NAME
    const category = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }
}

export { ListCategoryService };
