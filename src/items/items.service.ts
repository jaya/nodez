import { Inject, Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { IItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('IItemsRepository')
    private readonly itemsRepository: IItemsRepository,
  ) {}

  async getAll(): Promise<Item[]> {
    return this.itemsRepository.findAll();
  }
}
