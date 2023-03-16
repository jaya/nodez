import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { Gender } from '../../entities/survivor.entity';

export class InventoryItemDtoRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: string;
}

export class CreateInventoryItemDtoRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  item: InventoryItemDtoRequest;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  quantity: number;
}

export class CreateSurvivorDtoRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(130)
  age: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ required: true })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ required: true })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    required: true,
    type: CreateInventoryItemDtoRequest,
    isArray: true,
  })
  inventoryItems: CreateInventoryItemDtoRequest[];
}
