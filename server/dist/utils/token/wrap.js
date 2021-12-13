"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const wrapAccessToken = (payload) => {
    const _token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
    return _token;
};
exports.wrapAccessToken = wrapAccessToken;
//# sourceMappingURL=wrap.js.map