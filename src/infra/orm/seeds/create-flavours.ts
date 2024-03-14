import { PrismaClient } from '@prisma/client';
import { FlavourModel } from '/src/domain/models';

export const createFlavours = async () => {
  const flavours: Pick<
    FlavourModel,
    'description' | 'adittionalPreparationTime' | 'createdAt'
  >[] = [
    {
      description: 'Calabresa',
      createdAt: new Date(),
    },
    {
      description: 'Marguerita',
      createdAt: new Date(),
    },
    {
      description: 'Portuguesa',
      adittionalPreparationTime: 5,
      createdAt: new Date(),
    },
  ];

  const prismaClient = new PrismaClient();

  for (const flavour of flavours) {
    const flavourInDB = await prismaClient.flavour.findFirst({
      where: { description: flavour.description },
    });

    if (!flavourInDB) {
      await prismaClient.flavour.create({ data: flavour });
    }
  }
};
