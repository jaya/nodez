import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Survivor } from './survivor.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class InventoryItem {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn()
  id: string;
  @ApiProperty({ required: true })
  @Column()
  quantity: number;
  @ManyToOne(() => Survivor, (survivor) => survivor.inventoryItems)
  owner: Survivor;
  @ManyToOne(() => Item, (item) => item.inventoryItems)
  item: Item;
}
