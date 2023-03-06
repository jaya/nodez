import { CreateInventoryItemDto } from './create-inventory-item-dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  Max,
  Min,
} from 'class-validator';
import { Gender } from '../entities/survivor.entity';

export class CreateSurvivorDto {
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

  @ApiProperty({ required: true, type: CreateInventoryItemDto, isArray: true })
  inventoryItems: CreateInventoryItemDto[];
}
