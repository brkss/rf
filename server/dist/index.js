"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("./resolvers");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const token_1 = require("./utils/token");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
(async () => {
    await (0, typeorm_1.createConnection)({
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
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [resolvers_1.UserResolver, resolvers_1.MealResolver, resolvers_1.RateMealResolver, resolvers_1.StatsResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.get("/", (_, res) => {
        res.send("hello");
    });
    app.post("/refresh_token", async (req, res) => await (0, token_1.refreshToken)(req, res));
    app.listen(4000, () => {
        console.log("???? server runing at http://localhost:4000");
    });
})();
//# sourceMappingURL=index.js.map