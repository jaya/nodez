import { Test, TestingModule } from '@nestjs/testing';
import { SurvivorsController } from './Survivors.controller';
import { SurvivorsService } from './services/Survivors.service';
import { SurvivorGender } from './survivorGender';

describe('SurvivorsController', () => {
  let survivorsController: SurvivorsController;
  let survivorsService: SurvivorsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SurvivorsController],
      providers: [SurvivorsService],
    }).compile();

    survivorsService = moduleRef.get<SurvivorsService>(SurvivorsService);
    survivorsController =
      moduleRef.get<SurvivorsController>(SurvivorsController);
  });

  describe('create', () => {
    it('returns a new survivor', () => {
      const result = {
        id: 1,
        name: 'Bar',
        gender: SurvivorGender.male,
        age: 19,
      };
      jest
        .spyOn(survivorsService, 'createSurvivor')
        .mockImplementation(() => result);
      const createSurvivortDto = {
        name: 'Bar',
        gender: SurvivorGender.male,
        age: 19,
      };
      expect(survivorsController.create(createSurvivortDto)).toBe(result);
    });
  });
});
