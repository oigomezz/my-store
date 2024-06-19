import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY = '1234567890';
const API_KEY_PROD = 'PROD123456';

const uri =
  'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';

const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const database = client.db('store');
  const taskColletion = database.collection('tasks');
  const tasks = await taskColletion.find().toArray();
  console.log(tasks);
}

run();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
