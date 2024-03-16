import { Response } from 'express';
import {
  Body,
  Controller,
  Inject,
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
import { BuildCreateOrderControllerFactory } from 'src/main/factories/controllers';
import { CreateOrderDTO } from 'src/main/controllers/order/DTOs';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(BuildCreateOrderControllerFactory.name)
    private readonly buildCreateOrderControllerFactory: BuildCreateOrderControllerFactory,
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
  async find(@Body() data: CreateOrderDTO, @Res() response: Response) {
    const result = await controllerAdapter(
      this.buildCreateOrderControllerFactory.build(),
      { ...data },
    );
    return response.status(result.statusCode).json(result);
  }
}
