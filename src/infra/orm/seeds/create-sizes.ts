import { PrismaClient } from '@prisma/client';
import { SizeModel } from 'src/domain/models';

export const createSizes = async () => {
  const sizes: Pick<
    SizeModel,
    'description' | 'value' | 'preparationTime' | 'createdAt'
  >[] = [
    {
      description: 'Pequena',
      preparationTime: 15,
      value: 20.2,
      createdAt: new Date(),
    },
    {
      description: 'Média',
      preparationTime: 20,
      value: 30.3,
      createdAt: new Date(),
    },
    {
      description: 'Grande',
      preparationTime: 25,
      value: 40,
      createdAt: new Date(),
    },
  ];

  const prismaClient = new PrismaClient();

  for (const size of sizes) {
    const sizeInDB = await prismaClient.size.findFirst({
      where: { description: size.description },
    });

    if (!sizeInDB) {
      await prismaClient.size.create({ data: size });
    }
  }
};
