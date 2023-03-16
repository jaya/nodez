import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import AppDataSource from '@/infrastructure/database/database.config';
import { Survivor } from '@/survivors/entities/survivor.entity';

@Injectable()
export class DashboardsService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  get() {
    // return new DashboardDto();

    return AppDataSource.manager.find(Survivor);

    // return Promise.resolve(undefined);
  }
}
