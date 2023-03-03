import { Injectable } from '@nestjs/common';
import { CreateSurvivorDto } from './dtos/create-survivor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Survivor } from './entities/survivor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurvivorsService {
  constructor(
    @InjectRepository(Survivor)
    private survivorsRepository: Repository<Survivor>,
  ) {}
  async createSurvivor(body: CreateSurvivorDto): Promise<Survivor> {
    const newUser = await this.survivorsRepository.create(body);
    return this.survivorsRepository.save(newUser);
  }
}
