import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgresUrl: process.env.DATABASE_URL,
    postgres: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT, 10),
      host: process.env.MYSQL_HOST,
    },
    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
