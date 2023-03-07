import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock, MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Gender, Survivor } from './entities/survivor.entity';

import { SurvivorsService } from './survivors.service';

describe('SurvivorsService', () => {
  let service: SurvivorsService;
  let repository: MockProxy<Repository<Survivor>>;

  beforeEach(async () => {
    repository = mock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurvivorsService,
        {
          provide: getRepositoryToken(Survivor),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<SurvivorsService>(SurvivorsService);
  });

  it('should return an Error if survivor does not exists', async () => {
    await expect(
      service.update({ id: 'any_id', latitude: 1, longitude: 1 }),
    ).rejects.toThrow();
  });

  it('should be able to update a survivor and return', async () => {
    const survivor: Survivor = {
      id: 'any_id',
      name: 'any_name',
      age: 18,
      gender: Gender.MALE,
      latitude: 1,
      longitude: 1,
      inventoryItems: [],
      createdAt: new Date(),
    };

    const params = {
      id: 'any_id',
      latitude: 2,
      longitude: 2,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(survivor);

    const response = await service.update(params);

    expect(response).toMatchObject(params);
  });
});
