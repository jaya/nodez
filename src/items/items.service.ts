import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {}

  async createItem(body: CreateItemDto): Promise<Item> {
    const newItem = await this.itemsRepository.create(body);
    return this.itemsRepository.save(newItem);
  }

  async getItems() {
    return this.itemsRepository.find({
      order: {
        points: 'ASC',
      },
    });
  }
}
