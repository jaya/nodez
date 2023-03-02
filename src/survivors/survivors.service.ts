import { Injectable } from '@nestjs/common';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { Survivor } from './entities/survivor.entity';

@Injectable()
export class SurvivorsService {
  private survivors: Survivor[] = [
    { id: 1, name: 'Joe', age: 50, gender: 'male' },
    { id: 2, name: 'Ellie', age: 14, gender: 'female' },
  ];

  createSurvivor(createSurvivorDto: CreateSurvivorDto): Survivor {
    const newSurvivor = { id: Date.now(), ...createSurvivorDto };
    this.survivors.push(newSurvivor);

    return newSurvivor;
  }
}
