import * as dotenv from "dotenv";
dotenv.config();

export const DATABASE_CONFIG = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

/**
 *This is how we hide the database access info, while still being able to use it
 */
