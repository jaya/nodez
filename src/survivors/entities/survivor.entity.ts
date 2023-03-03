import { ApiProperty } from '@nestjs/swagger';
import { SurvivorGender } from '../survivorGender';

export class Survivor {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'Ellie',
  })
  name: string;

  @ApiProperty({
    type: Number,
    example: 24,
  })
  age: number;

  @ApiProperty({ enum: SurvivorGender, required: false, example: 'female' })
  gender?: SurvivorGender;
}
