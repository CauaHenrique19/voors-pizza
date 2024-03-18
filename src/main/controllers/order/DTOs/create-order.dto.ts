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
  @IsArray({ message: "items deve ser um arrayy" })
  @ArrayMinSize(1, { message: 'items deve conter ao menos 1 item' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}

class OrderItemDTO {
  @IsNumber({}, { message: 'sizeId deve ser um numero' })
  @IsInt({ message: 'sizeId deve ser um numero inteiro' })
  sizeId: number;

  @IsNumber({}, { message: 'flavourId deve ser um numero' })
  @IsInt({ message: 'flavourId deve ser um numero inteiro' })
  flavourId: number;

  @IsOptional()
  @IsArray({ message: 'personalizations deve ser um array' })
  @ArrayMinSize(1, {
    message: 'personalizations deve conter ao menos 1 item',
  })
  @IsNumber({}, { each: true, message: 'personalization deve ser um numero' })
  @IsInt({ each: true, message: 'personalization deve ser um numero inteiro' })
  personalizations: number[];
}
