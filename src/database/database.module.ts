import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY = '1234567890';
const API_KEY_PROD = 'PROD123456';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri =
          'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';

        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('store');
        return database;
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
