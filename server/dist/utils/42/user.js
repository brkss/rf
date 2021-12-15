"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = void 0;
const axios_1 = __importDefault(require("axios"));
const userData = async (access_token) => {
    let user = null;
    const config = {
        method: "GET",
        url: "https://api.intra.42.fr/v2/me",
        headers: { Authorization: `bearer ${access_token}` },
    };
    try {
        const res = await axios_1.default.request(config);
        const data = res.data;
        user.name = data.usual_full_name;
        user.campus = data.compus[0].name;
        user.campus_id = data.compus[0].id;
        user.username = data.login;
        return user;
    }
    catch (e) {
        console.log("something went wrong ! ", e);
        return null;
    }
};
exports.userData = userData;
//# sourceMappingURL=user.js.map