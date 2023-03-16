import { Test, TestingModule } from '@nestjs/testing';
import { Gender, Survivor } from './entities/survivor.entity';
import { SurvivorsController } from './survivors.controller';
import { SurvivorsService } from './survivors.service';
import { mock } from 'jest-mock-extended';
import { plainToClass } from 'class-transformer';
import { CreateSurvivorDtoRequest } from '@/survivors/dtos/request/create-survivor.dto.request';
import { CreateSurvivorDtoResponse } from '@/survivors/dtos/response/create-survivor.dto.response';

describe('SurvivorsController', () => {
  let survivorsController: SurvivorsController;
  let survivorsService: SurvivorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurvivorsController],
      providers: [
        {
          provide: SurvivorsService,
          useValue: mock<SurvivorsService>(),
        },
      ],
    }).compile();

    survivorsController = module.get<SurvivorsController>(SurvivorsController);
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

      const responseBody = plainToClass(CreateSurvivorDtoResponse, {
        id: 'any_id',
        createdAt: new Date(),
        requestBody,
      });

      jest.spyOn(survivorsService, 'create').mockResolvedValue(responseBody);

      expect(
        await survivorsController.createSurvivor(requestBody),
      ).toBe<CreateSurvivorDtoResponse>(responseBody);
      expect(survivorsService.create).toHaveBeenCalledWith(requestBody);
    });
  });

  describe('update', () => {
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

      const body = {
        latitude: 2,
        longitude: 2,
      };

      jest.spyOn(survivorsService, 'update').mockResolvedValue({
        ...survivor,
        ...body,
      });

      const response = await survivorsController.updateSurvivor('any_id', body);
      expect(response).toMatchObject(body);
    });
  });

  describe('getSurvivors', () => {
    it('should be able to get survivors and return', async () => {
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

      jest.spyOn(survivorsService, 'getAll').mockResolvedValue([survivor]);

      const response = await survivorsController.getSurvivors();

      expect(response).toEqual([survivor]);
    });
  });
});
