import { CreateInventoryItemDto } from './create-inventory-item-dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateSurvivorDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Min(0)
  @Max(130)
  age: number;
  @ApiProperty({ required: true })
  @IsLatitude()
  latitude: number;
  @ApiProperty({ required: true })
  @IsLongitude()
  longitude: number;
  @ApiProperty({ required: true })
  inventoryItems: CreateInventoryItemDto[];
}
