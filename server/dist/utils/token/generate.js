"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const simple_oauth2_1 = require("simple-oauth2");
const generateToken = async (code) => {
    let _token = null;
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
    const tokenParams = {
        code: code,
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
exports.generateToken = generateToken;
//# sourceMappingURL=generate.js.map