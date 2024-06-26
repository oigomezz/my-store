import { Injectable, Inject, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from './config';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @UseGuards(ApiKeyGuard)
  getHello(): string {
    const apiKey = this.configService.apiKey;
    return `Hello World! ${apiKey}`;
  }

  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
