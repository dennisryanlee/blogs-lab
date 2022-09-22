import * as dotenv from "dotenv";
dotenv.config();

export const DB_CONFIG = {
  host: process.env.DB_HOST,
  port: Number(5433), // use default port 5433 if not specified
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const POSTGRES_CONFIG = {
  connectionString: process.env.POSTGRES_URL!,
};

export const STRIPE_CONFIG = { stripeSecretKey: process.env.STRIPE_API_SECRET_KEY };

export const MAILGUN_CONFIG = {
  mailgunAPIKey: process.env.MAILGUN_API_KEY,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  mailgunToEmail: process.env.MAILGUN_TO_EMAIL,
};

export const JWT_CONFIG = { jwtSecretKey: process.env.JWT_SECRET_KEY };

/**
 *This is how we hide the database access info, while still being able to use it
 */
