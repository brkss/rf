"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = void 0;
const axios_1 = __importDefault(require("axios"));
const userData = async (access_token) => {
    const config = {
        method: "GET",
        url: "https://api.intra.42.fr/v2/me",
        headers: { Authorization: `bearer ${access_token}` },
    };
    try {
        const res = await axios_1.default.request(config);
        const data = res.data;
        console.log("data => ", data.displayname);
        const user = {
            name: data.displayname,
            campus: data.campus[0].name,
            campus_id: data.campus[0].id,
            username: data.login,
        };
        return user;
    }
    catch (e) {
        console.log("something went wrong ! ", e);
        return null;
    }
};
exports.userData = userData;
//# sourceMappingURL=user.js.map