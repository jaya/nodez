import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  points: number;
}
