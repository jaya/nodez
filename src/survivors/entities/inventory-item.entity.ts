import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @Column()
  ownerId: string;
  @ManyToOne(() => Survivor, (survivor) => survivor.inventoryItems)
  @JoinColumn({ referencedColumnName: 'id', name: 'owner_id' })
  owner: Survivor;
  @Column()
  itemId: string;
  @ManyToOne(() => Item, (item) => item.inventoryItems)
  @JoinColumn({ referencedColumnName: 'id', name: 'item_id' })
  item: Item;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
