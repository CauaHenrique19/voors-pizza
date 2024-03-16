import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { controllerAdapter } from 'src/main/adapters';
import {
  BuildCreateOrderControllerFactory,
  BuildFindOrderByIdControllerFactory,
} from 'src/main/factories/controllers';
import { CreateOrderDTO } from 'src/main/controllers/order/DTOs';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(BuildCreateOrderControllerFactory.name)
    private readonly buildCreateOrderControllerFactory: BuildCreateOrderControllerFactory,
    @Inject(BuildFindOrderByIdControllerFactory.name)
    private readonly buildFindOrderByIdControllerFactory: BuildFindOrderByIdControllerFactory,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro inesperado na execução',
  })
  @ApiNotFoundResponse({
    description: 'Tamanho, ou sabor, ou personalização não encontrados',
  })
  @ApiBadRequestResponse({
    description: 'Personalização repetida',
  })
  @ApiOkResponse({
    description: 'Pedido criado',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() data: CreateOrderDTO, @Res() response: Response) {
    const result = await controllerAdapter(
      this.buildCreateOrderControllerFactory.build(),
      { ...data },
    );
    return response.status(result.statusCode).json(result);
  }

  @ApiInternalServerErrorResponse({
    description: 'Erro inesperado na execução',
  })
  @ApiNotFoundResponse({
    description: 'Pedido não encontrado',
  })
  @ApiOkResponse({
    description: 'Pedido retornado',
  })
  @Get('/:id')
  async find(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await controllerAdapter(
      this.buildFindOrderByIdControllerFactory.build(),
      { id },
    );
    return response.status(result.statusCode).json(result);
  }
}
