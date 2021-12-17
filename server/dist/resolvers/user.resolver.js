"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const token_1 = require("../utils/token");
const auth_1 = require("../utils/responses/auth");
const _42_1 = require("../utils/42");
const User_1 = require("../entity/User");
const middlewares_1 = require("../utils/middlewares");
let UserResolver = class UserResolver {
    ping() {
        return "pong !";
    }
    async auth(code, ctx) {
        if (!code) {
            return {
                status: false,
                message: "Invalid Code !",
            };
        }
        const _access = await (0, token_1.generateToken)(code);
        if (!_access) {
            return {
                status: false,
                message: "Unauthorized !",
            };
        }
        console.log("access info => ", _access);
        const user_data = await (0, _42_1.userData)(_access.token.access_token);
        if (!user_data ||
            user_data.campus_id != 21 ||
            user_data.campus != "Benguerir")
            return {
                status: false,
                message: "Invalid user !",
            };
        let user = await User_1.User.findOne({ where: { username: user_data.username } });
        if (!user) {
            user = new User_1.User();
            user.name = user_data.name;
            user.campus = user_data.campus;
            user.campus_id = user_data.campus_id;
            user.username = user_data.username;
            await user.save();
        }
        const _token = (0, token_1.wrapAccessToken)({
            token: _access.token.access_token,
            expire_in: _access.token.expires_in,
            created_at: _access.token.created_at,
            usr_id: user.id,
        });
        const _refreshToken = (0, token_1.wrapRefreshToken)({
            token: _access.token.refresh_token,
            usr_id: user.id,
        });
        ctx.res.cookie("uid", _refreshToken, {
            httpOnly: true,
        });
        return {
            status: true,
            message: "Loggin successfuly !",
            token: _token,
        };
    }
    async me(ctx) {
        console.log("payload : ", ctx.payload);
        return "good";
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "ping", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => auth_1.AuthDefaultResponse),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "auth", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(middlewares_1.isUserAuth),
    (0, type_graphql_1.Query)(() => String),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map