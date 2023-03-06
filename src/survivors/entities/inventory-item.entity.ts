import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Survivor } from './survivor.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';

@Entity('inventory_items')
export class InventoryItem {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({ required: true })
  @Column()
  quantity: number;
  @Column({ name: 'owner_id' })
  ownerId: string;
  @ManyToOne(() => Survivor, (survivor) => survivor.inventoryItems)
  @JoinColumn({ referencedColumnName: 'id', name: 'owner_id' })
  owner: Survivor;
  @Column({ name: 'item_id' })
  itemId: string;
  @ManyToOne(() => Item, (item) => item.inventoryItems)
  @JoinColumn({ referencedColumnName: 'id', name: 'item_id' })
  item: Item;
}
