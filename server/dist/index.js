"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const simple_oauth2_1 = require("simple-oauth2");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("./resolvers");
(async () => {
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [resolvers_1.UserResolver],
            validate: false,
        }),
    });
    apolloServer.applyMiddleware({ app });
    const config = {
        client: {
            id: process.env.UID,
            secret: process.env.SEC,
        },
        auth: {
            tokenHost: "https://api.intra.42.fr",
        },
    };
    const client = new simple_oauth2_1.AuthorizationCode(config);
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
const getToken = async (client) => {
    let _token = "";
    const tokenParams = {
        code: "80a21e7ce1e11d23917fae0968314047733774d5bbcc5fb977f84e106ad3f7c1",
        redirect_uri: "http://localhost:3000",
        scope: "public",
    };
    try {
        _token = await client.getToken(tokenParams);
    }
    catch (error) {
        console.log("Access Token Error", error.message);
    }
    return _token;
};
//# sourceMappingURL=index.js.map