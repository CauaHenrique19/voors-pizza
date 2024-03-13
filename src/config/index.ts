import { config } from 'dotenv';

config();

export const CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
};
