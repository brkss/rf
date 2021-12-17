"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRefreshToken = exports.wrapAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const wrapAccessToken = (payload) => {
    const _token = jsonwebtoken_1.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
    return _token;
};
exports.wrapAccessToken = wrapAccessToken;
const wrapRefreshToken = (payload) => {
    const _token = jsonwebtoken_1.sign(payload, process.env.JWT_REFRESH, {
        expiresIn: "7d",
    });
    return _token;
};
exports.wrapRefreshToken = wrapRefreshToken;
//# sourceMappingURL=wrap.js.map