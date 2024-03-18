import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMinSize,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsInt,
} from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({ description: 'Items do pedido' })
  @IsArray({ message: 'items deve ser um arrayy' })
  @ArrayMinSize(1, { message: 'items deve conter ao menos 1 item' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}

class OrderItemDTO {
  @ApiProperty({ description: 'Id do tamanho' })
  @IsNumber({}, { message: 'sizeId deve ser um numero' })
  @IsInt({ message: 'sizeId deve ser um numero inteiro' })
  sizeId: number;

  @ApiProperty({ description: 'Id do sabor' })
  @IsNumber({}, { message: 'flavourId deve ser um numero' })
  @IsInt({ message: 'flavourId deve ser um numero inteiro' })
  flavourId: number;

  @ApiProperty({ description: 'Ids das personalizações selecionadas' })
  @IsOptional()
  @IsArray({ message: 'personalizations deve ser um array' })
  @ArrayMinSize(1, {
    message: 'personalizations deve conter ao menos 1 item',
  })
  @IsNumber({}, { each: true, message: 'personalization deve ser um numero' })
  @IsInt({ each: true, message: 'personalization deve ser um numero inteiro' })
  personalizations: number[];
}
