import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurvivorDtoRequest } from './dtos/request/create-survivor.dto.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Survivor } from './entities/survivor.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateSurvivorDtoResponse } from '@/survivors/dtos/response/create-survivor.dto.response';

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

  async create(
    body: CreateSurvivorDtoRequest,
  ): Promise<CreateSurvivorDtoResponse> {
    const newUser = this.survivorsRepository.create(body);

    return CreateSurvivorDtoResponse.fromEntity(
      await this.survivorsRepository.save(newUser),
    );
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

  async getAll(search?: string): Promise<Survivor[]> {
    const options: FindManyOptions<Survivor> = {
      where: {
        infectedAt: null,
      },
      order: {
        createdAt: 'desc',
      },
    };

    if (search) {
      return this.survivorsRepository.find({
        ...options,
        where: {
          ...options.where,
          name: ILike(`%${search}%`),
        },
      });
    }

    return this.survivorsRepository.find(options);
  }
}
