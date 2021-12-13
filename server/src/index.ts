import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { AuthorizationCode } from "simple-oauth2";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";

(async () => {
  const app = express();

  // init apolloServer
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });
  const config = {
    client: {
      id: process.env.UID!,
      secret: process.env.SEC!,
    },
    auth: {
      tokenHost: "https://api.intra.42.fr",
    },
  };
  const client = new AuthorizationCode(config);

  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.post("/auth", async (_, res) => {
    res.json({
      token: await getToken(client),
    });
  });

  console.log("hello world !");

  app.listen(4000, () => {
    console.log("🚀 server runing at http://localhost:4000");
  });
})();

const getToken = async (client: any) => {
  let _token = "";
  const tokenParams = {
    code: "80a21e7ce1e11d23917fae0968314047733774d5bbcc5fb977f84e106ad3f7c1",
    redirect_uri: "http://localhost:3000",
    scope: "public",
  };
  try {
    _token = await client.getToken(tokenParams);
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
  return _token;
};

/*
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));*/
