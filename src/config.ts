import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
  };
});
