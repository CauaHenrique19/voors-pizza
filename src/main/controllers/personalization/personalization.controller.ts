import { Response } from 'express';
import { Controller, Get, Inject, Res } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { controllerAdapter } from 'src/main/adapters';
import { BuildFindPersonalizationsControllerFactory } from 'src/main/factories/controllers';

@ApiTags('Personalizations')
@Controller('personalizations')
export class PersonalizationController {
  constructor(
    @Inject(BuildFindPersonalizationsControllerFactory.name)
    private readonly buildFindPersonalizationsControllerFactory: BuildFindPersonalizationsControllerFactory,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro inesperado na execução',
  })
  @ApiNotFoundResponse({
    description: 'Nenhuma personalização encontrada',
  })
  @ApiOkResponse({
    description: 'Personalizações disponívels',
    isArray: true,
  })
  @Get('/')
  async find(@Res() response: Response) {
    const result = await controllerAdapter(
      this.buildFindPersonalizationsControllerFactory.build(),
    );
    return response.status(result.statusCode).json(result);
  }
}
