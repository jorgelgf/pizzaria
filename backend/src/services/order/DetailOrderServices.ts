import prismaClient from "../../prisma";
interface DetailRequest {
  order_id: string;
}
class DetailOrderServices {
  async execute({ order_id }: DetailRequest) {
    const orders = await prismaClient.item.findMany({
      where: {
        order_id: order_id,
      },
      //include details
      include: {
        product: true,
        ordes: true,
      },
    });
    return orders;
  }
}

export { DetailOrderServices };
