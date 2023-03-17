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
import { Item } from '@/items/entities/item.entity';

@Entity('inventory_items')
export class InventoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  quantity: number;
  @ManyToOne(() => Survivor, (survivor) => survivor.inventoryItems)
  @JoinColumn({ referencedColumnName: 'id', name: 'owner_id' })
  owner: Survivor;
  @ManyToOne(() => Item, (item) => item.inventoryItems)
  @JoinColumn({ referencedColumnName: 'id', name: 'item_id' })
  item: Item;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
