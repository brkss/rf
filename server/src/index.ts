import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { AuthorizationCode } from "simple-oauth2";

(async () => {
  const app = express();
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
    code: "45a107e394be2fbfc7efaf9a4e5db944a7bda9c795c439f626c5828c80dd0c45",
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
