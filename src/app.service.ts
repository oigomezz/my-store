import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private database: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    return `Hello World! ${apiKey}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.database.query('SELECT * FROM tasks', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
