import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
  UserResolver,
  MealResolver,
  RateMealResolver,
  StatsResolver,
} from "./resolvers";
import cookieParser from "cookie-parser";
import { refreshToken } from "./utils/token";
import cors from "cors";
import { createConnection } from "typeorm";

(async () => {
  await createConnection({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "rate_food",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/entity",
      migrationsDir: "dist/migration",
      subscribersDir: "dist/subscriber",
    },
  });
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  // init apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, MealResolver, RateMealResolver, StatsResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.post("/refresh_token", async (req, res) => await refreshToken(req, res));

  app.listen(4000, () => {
    console.log("🚀 server runing at http://localhost:4000");
  });
})();
