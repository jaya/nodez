import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock, MockProxy } from 'jest-mock-extended';
import { FindOperator, Repository } from 'typeorm';
import { Gender, Survivor } from './entities/survivor.entity';

import { SurvivorsService } from './survivors.service';
import { plainToClass } from 'class-transformer';
import { CreateSurvivorDtoRequest } from '@/survivors/dtos/request/create-survivor.dto.request';
import { CreateSurvivorDtoResponse } from '@/survivors/dtos/response/create-survivor.dto.response';

describe('SurvivorsService', () => {
  let survivorsService: SurvivorsService;
  let survivorsRepository: MockProxy<Repository<Survivor>>;

  beforeEach(async () => {
    survivorsRepository = mock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurvivorsService,
        {
          provide: getRepositoryToken(Survivor),
          useValue: survivorsRepository,
        },
      ],
    }).compile();

    survivorsService = module.get<SurvivorsService>(SurvivorsService);
  });

  describe('create', () => {
    it('should be able to create a survivor and return', async () => {
      const requestBody: CreateSurvivorDtoRequest = {
        name: 'any_name',
        age: 18,
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
        inventoryItems: [{ item: { id: '1' }, quantity: 10 }],
      };

      const rawBody = {
        id: 'any_id',
        createdAt: new Date(),
        requestBody,
      };

      const survivor: Survivor = plainToClass(Survivor, rawBody);

      const responseBody: CreateSurvivorDtoResponse = plainToClass(
        CreateSurvivorDtoResponse,
        rawBody,
      );

      jest.spyOn(survivorsRepository, 'create').mockReturnValueOnce(survivor);
      jest.spyOn(survivorsRepository, 'save').mockResolvedValue(survivor);

      expect(
        await survivorsService.create(requestBody),
      ).toStrictEqual<CreateSurvivorDtoResponse>(responseBody);
      expect(survivorsRepository.create).toHaveBeenCalledWith(requestBody);
      expect(survivorsRepository.save).toHaveBeenCalledWith(survivor);
    });
  });

  describe('update', () => {
    it('should return an Error if survivor does not exists', async () => {
      await expect(
        survivorsService.update({ id: 'any_id', latitude: 1, longitude: 1 }),
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

      jest.spyOn(survivorsRepository, 'findOne').mockResolvedValue(survivor);

      const response = await survivorsService.update(params);

      expect(response).toMatchObject(params);
    });
  });

  describe('getAll', () => {
    it('should be able to get survivors', async () => {
      const survivors: Survivor[] = [
        {
          id: 'any_id',
          age: 18,
          name: 'any_name',
          createdAt: new Date(),
          gender: Gender.MALE,
          latitude: 1,
          longitude: 1,
          inventoryItems: [],
        },
      ];

      survivorsRepository.find.mockResolvedValueOnce(survivors);

      const response = await survivorsService.getAll();

      expect(survivorsRepository.find).toHaveBeenCalledTimes(1);
      expect(survivorsRepository.find).toHaveBeenCalledWith({
        where: {
          infectedAt: null,
        },
        order: {
          createdAt: 'desc',
        },
      });
      expect(response).toBe(survivors);
    });

    it('should be able to get survivors filter by name', async () => {
      const survivors: Survivor[] = [
        {
          id: 'any_id',
          age: 18,
          name: 'any_name',
          createdAt: new Date(),
          gender: Gender.MALE,
          latitude: 1,
          longitude: 1,
          inventoryItems: [],
        },
      ];

      survivorsRepository.find.mockResolvedValueOnce(survivors);

      const response = await survivorsService.getAll('any_name');

      expect(survivorsRepository.find).toHaveBeenCalledTimes(1);
      expect(survivorsRepository.find).toHaveBeenCalledWith({
        where: {
          infectedAt: null,
          name: expect.any(FindOperator),
        },
        order: {
          createdAt: 'desc',
        },
      });
      expect(response).toBe(survivors);
    });
  });
});
