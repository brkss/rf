"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const axios_1 = __importDefault(require("axios"));
const wrap_1 = require("./wrap");
const refreshToken = async (req, res) => {
    console.log("=======> trying to refresh <======");
    const _token = req.cookies.uid;
    if (!_token) {
        return res.send({
            status: false,
            token: "",
            message: "Token not found !",
        });
    }
    let payload = null;
    try {
        payload = (0, jsonwebtoken_1.verify)(_token, process.env.JWT_REFRESH);
    }
    catch (e) {
        console.log("token invalid ! =>", e);
        return res.send({
            status: false,
            token: "",
            message: "Invalid Token",
        });
    }
    const options = {
        method: "POST",
        url: "https://api.intra.42.fr/oauth/token",
        data: {
            grant_type: "refresh_token",
            client_id: process.env.UID,
            client_secret: process.env.SEC,
            refresh_token: payload.token,
        },
    };
    let _access = null;
    try {
        const resp = await axios_1.default.request(options);
        _access = resp.data;
    }
    catch (e) {
        console.log("error accured while trying to refresh token : ", e);
        return res.send({
            status: false,
            token: "",
            message: "Something went wrong trying to refresh token !",
        });
    }
    const _accessToken = (0, wrap_1.wrapAccessToken)({
        token: _access.access_token,
        expire_in: _access.expires_in,
        created_at: _access.created_at,
    });
    const _refreshToken = (0, wrap_1.wrapRefreshToken)({
        token: _access.refresh_token,
    });
    res.cookie("uid", _refreshToken, {
        httpOnly: true,
    });
    return res.send({
        status: true,
        token: _accessToken,
        message: "token refreshed successfuly !",
    });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=refresh.js.map