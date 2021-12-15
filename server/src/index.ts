import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";
import cookieParser from "cookie-parser";
import { refreshToken } from "./utils/token";
import cors from "cors";
import { createConnection } from "typeorm";

(async () => {
  await createConnection();
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  // init apolloServer
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
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
