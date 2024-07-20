import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { User } from "./src/user/controller";
import { UserService } from "./src/user/service";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaDB } from "./src/db";

import { JWT } from "./src/jwt";

import cors from "cors";

const container = new Container();

/**
 * user 模块
 */
container.bind(User).to(User);
container.bind(UserService).to(UserService);

/**
 * 封装PrismaClient
 */
container.bind<PrismaClient>("PrismaClient").toFactory(() => {
  return () => {
    return new PrismaClient();
  };
});
container.bind(PrismaDB).to(PrismaDB);

/**
 * jwt
 */
container.bind(JWT).to(JWT);

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use(cors());
  app.use(container.get(JWT).init());
});

const app = server.build();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
    }
  }
}
