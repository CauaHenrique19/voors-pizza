import { Response } from 'express';
import { Controller, Get, Inject, Res } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { controllerAdapter } from 'src/main/adapters';
import { BuildFindSizesControllerFactory } from 'src/main/factories/controllers';

@ApiTags('Sizes')
@Controller('sizes')
export class SizeController {
  constructor(
    @Inject(BuildFindSizesControllerFactory.name)
    private readonly buildFindSizesControllerFactory: BuildFindSizesControllerFactory,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro inesperado na execução',
  })
  @ApiNotFoundResponse({
    description: 'Nenhum tamanho encontrado',
  })
  @ApiOkResponse({
    description: 'Tamanhos disponívels',
    isArray: true,
  })
  @Get('/')
  async find(@Res() response: Response) {
    const result = await controllerAdapter(
      this.buildFindSizesControllerFactory.build(),
    );
    return response.status(result.statusCode).json(result);
  }
}
