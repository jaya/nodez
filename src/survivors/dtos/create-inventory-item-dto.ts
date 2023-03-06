import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateInventoryItemDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  itemId: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  quantity: number;
}
