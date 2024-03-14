import { Response } from 'express';
import { Controller, Get, Inject, Res } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { controllerAdapter } from 'src/main/adapters';
import { BuildFindFlavoursControllerFactory } from 'src/main/factories/controllers';

@ApiTags('Flavours')
@Controller('flavours')
export class FlavourController {
  constructor(
    @Inject(BuildFindFlavoursControllerFactory.name)
    private readonly buildFindFlavoursControllerFactory: BuildFindFlavoursControllerFactory,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro inesperado na execução',
  })
  @ApiNotFoundResponse({
    description: 'Nenhum sabor encontrado',
  })
  @ApiOkResponse({
    description: 'Sabores disponívels',
    isArray: true,
  })
  @Get('/')
  async find(@Res() response: Response) {
    const result = await controllerAdapter(
      this.buildFindFlavoursControllerFactory.build(),
    );
    return response.status(result.statusCode).json(result);
  }
}
