import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
  ApiBody,
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

  @ApiBody({
    examples: {
      'Com personalizações': {
        description: 'Pedido com personalizações',
        value: {
          items: [
            {
              flavourId: 1,
              sizeId: 1,
              personalizations: [1, 2, 3],
            },
          ],
        } as CreateOrderDTO,
      },
      'Sem personalizações': {
        description: 'Pedido sem personalizações',
        value: {
          items: [
            {
              flavourId: 1,
              sizeId: 1,
            },
          ],
        } as CreateOrderDTO,
      },
      'Com mais de 1 item': {
        description: 'Pedido com mais 1 item',
        value: {
          items: [
            {
              flavourId: 1,
              sizeId: 1,
              personalizations: [1, 2, 3],
            },
            {
              flavourId: 2,
              sizeId: 2,
              personalizations: [1, 2],
            },
          ],
        } as CreateOrderDTO,
      },
    },
    isArray: true,
  })
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
