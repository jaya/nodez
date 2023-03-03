import { ApiProperty } from '@nestjs/swagger';
import { SurvivorGender } from '../survivorGender';

export class CreateSurvivorDto {
  @ApiProperty({
    type: String,
    description: 'A name to scream',
    example: 'Ellie',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'your time is coming',
    example: '24',
  })
  age: number;

  @ApiProperty({
    enum: SurvivorGender,
    required: false,
    description: "it doesn't matter a survivor's gender",
  })
  gender?: SurvivorGender;
}
