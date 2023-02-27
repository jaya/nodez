import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Survivor } from './survivor.entity';
import { ISurvivorsRepository } from './survivors.repository';

export type UpdateSurvivorParams = {
  id: string;
  latitude: number;
  longitude: number;
};

@Injectable()
export class SurvivorsService {
  constructor(
    @Inject('ISurvivorsRepository')
    private readonly survivorsRepository: ISurvivorsRepository,
  ) {}

  async update({
    id,
    latitude,
    longitude,
  }: UpdateSurvivorParams): Promise<Survivor> {
    let survivor = await this.survivorsRepository.findById(id);

    if (!survivor) {
      throw new NotFoundException('Survivor not found');
    }

    survivor = await this.survivorsRepository.update(id, {
      latitude,
      longitude,
    });

    return survivor;
  }
}
