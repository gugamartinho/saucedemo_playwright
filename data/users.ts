import dotenv from "dotenv";
dotenv.config();

export const VALID_USER = {
  username: process.env.VALID_USERNAME || "",
  password: process.env.VALID_PASSWORD || "",
};

export const LOCKED_USER = {
  username: process.env.LOCKED_USERNAME || "",
  password: process.env.LOCKED_PASSWORD || "",
};
