import { Test, TestingModule } from '@nestjs/testing';
import { Gender, Survivor } from './entities/survivor.entity';
import { SurvivorsController } from './survivors.controller';
import { SurvivorsService } from './survivors.service';
import { mock } from 'jest-mock-extended';
import { plainToClass } from 'class-transformer';
import { CreateSurvivorDto } from '@/survivors/dtos/create-survivor.dto';

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

  describe('createItem', () => {
    it('should be able to create a survivor and return', async () => {
      const requestBody: CreateSurvivorDto = {
        name: 'any_name',
        age: 18,
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
        inventoryItems: [{ itemId: '1', quantity: 10 }],
      };

      const survivor = plainToClass(Survivor, {
        id: 'any_id',
        createdAt: new Date(),
        requestBody,
      });

      jest
        .spyOn(survivorsService, 'create')
        .mockImplementation(() => Promise.resolve(survivor));

      expect(
        await survivorsController.createSurvivor(requestBody),
      ).toBe<Survivor>(survivor);
      expect(survivorsService.create).toHaveBeenCalledWith(requestBody);
    });
  });

  describe('updateSurvivor', () => {
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
});
