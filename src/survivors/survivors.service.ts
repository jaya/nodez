import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurvivorDto } from './dtos/create-survivor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Survivor } from './entities/survivor.entity';
import { Repository } from 'typeorm';

export type UpdateSurvivorParams = {
  id: string;
  latitude: number;
  longitude: number;
};

@Injectable()
export class SurvivorsService {
  constructor(
    @InjectRepository(Survivor)
    private readonly survivorsRepository: Repository<Survivor>,
  ) {}

  async createSurvivor(body: CreateSurvivorDto): Promise<Survivor> {
    const newUser = await this.survivorsRepository.create(body);
    return this.survivorsRepository.save(newUser);
  }

  async update({
    id,
    latitude,
    longitude,
  }: UpdateSurvivorParams): Promise<Survivor> {
    let survivor = await this.survivorsRepository.findById(id);

    if (!survivor) {
      throw new NotFoundException('Survivor not found');
    }

    this.survivorsRepository.c

    survivor = await this.survivorsRepository.update(id, {
      latitude,
      longitude,
    });

    return survivor;
  }
}
