import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  IsEnum,
  Min,
  Max,
  IsNotEmpty,
  IsAlphanumeric,
  MinLength,
  MaxLength,
} from 'class-validator';
import { SurvivorGender } from '../survivorGender';

export class CreateSurvivorDto {
  @ApiProperty({
    type: String,
    description: 'A name to scream',
    example: 'Ellie',
  })
  @IsAlphanumeric()
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'your time is coming',
    example: '24',
  })
  @IsInt()
  @Min(10)
  @Max(120)
  age: number;

  @ApiProperty({
    enum: SurvivorGender,
    required: false,
    description: "it doesn't matter a survivor's gender",
  })
  @IsOptional()
  @IsEnum({ entity: SurvivorGender })
  gender?: SurvivorGender;
}
