import * as dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  stripeSecretKey: process.env.STRIPE_API_SECRET_KEY,
};

/**
 *This is how we hide the database access info, while still being able to use it
 */
