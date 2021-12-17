"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isUserAuth = ({ context }, next) => {
    const auth = context.req.headers["authorization"];
    if (!auth) {
        throw new Error("Not authenticated!");
    }
    const _token = auth.split(" ")[1];
    if (!_token) {
        throw new Error("No token found !");
    }
    try {
        const payload = (0, jsonwebtoken_1.verify)(_token, process.env.JWT_SECRET);
        context.payload = payload;
    }
    catch (e) {
        console.log("token verf error => ", e);
        throw new Error("Something went varifying token !");
    }
    return next();
};
exports.isUserAuth = isUserAuth;
//# sourceMappingURL=auth.mw.js.map