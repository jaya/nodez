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

  async create(body: CreateSurvivorDto): Promise<Survivor> {
    const newUser = this.survivorsRepository.create(body);
    return this.survivorsRepository.save(newUser);
  }

  async update({
    id,
    latitude,
    longitude,
  }: UpdateSurvivorParams): Promise<Survivor> {
    const survivor = await this.survivorsRepository.findOne({
      where: {
        id,
      },
    });

    if (!survivor) {
      throw new NotFoundException('Survivor not found');
    }

    await this.survivorsRepository.update(id, {
      latitude,
      longitude,
    });

    return {
      ...survivor,
      latitude,
      longitude,
    };
  }
}
