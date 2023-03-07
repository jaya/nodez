import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { InternalServerErrorResponseDto } from '@/infrastructure/dtos/internal-server-error-response.dto';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiCreatedResponse({ type: Item })
  @ApiInternalServerErrorResponse()
  @Post()
  createItem(@Body() body: CreateItemDto): any {
    return this.itemsService.createItem(body);
  }

  @ApiOkResponse({ type: Item, isArray: true })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
  })
  @Get()
  getItems() {
    return this.itemsService.getItems();
  }
}
