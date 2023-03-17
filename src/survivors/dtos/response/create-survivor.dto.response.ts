import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { Survivor } from '../../entities/survivor.entity';

export class CreateInventoryItemDtoResponse {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  quantity: number;
}

export class CreateSurvivorDtoResponse {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: string;

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
  gender: string;

  @ApiProperty({ required: true })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ required: true })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    required: true,
    type: CreateInventoryItemDtoResponse,
    isArray: true,
  })
  inventoryItems: CreateInventoryItemDtoResponse[] = [];

  static fromEntity(survivor: Survivor): CreateSurvivorDtoResponse {
    const dto = new CreateSurvivorDtoResponse();

    dto.id = survivor.id;
    dto.name = survivor.name;
    dto.age = survivor.age;
    dto.gender = survivor.gender;
    dto.latitude = survivor.latitude;
    dto.longitude = survivor.longitude;

    survivor.inventoryItems.forEach(function (inventoryItem) {
      const inventoryItemDto = new CreateInventoryItemDtoResponse();
      inventoryItemDto.id = inventoryItem.id;
      inventoryItemDto.itemId = inventoryItem.item.id;
      inventoryItemDto.quantity = inventoryItem.quantity;
      dto.inventoryItems.push(inventoryItemDto);
    });

    return dto;
  }
}
