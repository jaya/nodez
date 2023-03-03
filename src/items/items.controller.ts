import { Body, Controller, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dtos/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiCreatedResponse({ type: Item })
  @ApiInternalServerErrorResponse()
  @Post()
  createItem(@Body() body: CreateItemDto): any {
    return this.itemsService.createItem(body);
  }
}
