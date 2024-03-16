import { PrismaClient } from '@prisma/client';
import { PersonalizationModel } from 'src/domain/models';

export const createPersonalizations = async () => {
  const personalizations: Pick<
    PersonalizationModel,
    'description' | 'value' | 'adittionalPreparationTime' | 'createdAt'
  >[] = [
    {
      description: 'Extra Bacon',
      value: 3,
      createdAt: new Date(),
    },
    {
      description: 'Sem Cebola',
      createdAt: new Date(),
    },
    {
      description: 'Borda Recheada',
      adittionalPreparationTime: 5,
      value: 5,
      createdAt: new Date(),
    },
  ];

  const prismaClient = new PrismaClient();

  for (const personalization of personalizations) {
    const personalizationIdDB = await prismaClient.personalization.findFirst({
      where: { description: personalization.description },
    });

    if (!personalizationIdDB) {
      await prismaClient.personalization.create({ data: personalization });
    }
  }
};
