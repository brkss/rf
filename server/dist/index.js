"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const simple_oauth2_1 = require("simple-oauth2");
(async () => {
    const app = (0, express_1.default)();
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
        code: "45a107e394be2fbfc7efaf9a4e5db944a7bda9c795c439f626c5828c80dd0c45",
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