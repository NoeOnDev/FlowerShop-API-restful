import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

export const envConfig = {
  port: PORT,
  db: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    pass: DB_PASS,
    name: DB_NAME,
  },
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN,
  },
};
