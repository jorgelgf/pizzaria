import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

//usado para manipulação da base de dados
export default prismaClient;
