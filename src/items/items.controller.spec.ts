import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from '@/items/entities/item.entity';

describe('ItemsController', () => {
  let controller: ItemsController;
  let itemsService: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: mock<ItemsService>() }],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    itemsService = module.get<ItemsService>(ItemsService);
  });

  describe('createItem', () => {
    it('should return success with valid body', async () => {
      const requestBody = {
        name: 'any_name',
        points: 18,
      };

      const item: Item = {
        id: 'any_id',
        name: 'any_name',
        points: 18,
        createdAt: new Date(),
      };

      jest.spyOn(itemsService, 'createItem').mockResolvedValueOnce(item);

      expect(await controller.createItem(requestBody)).toBe(item);
      expect(itemsService.createItem).toHaveBeenCalledWith(requestBody);
    });
  });
});
