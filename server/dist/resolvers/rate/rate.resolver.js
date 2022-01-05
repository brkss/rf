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
exports.RateMealResolver = void 0;
const middlewares_1 = require("../../utils/middlewares");
const type_graphql_1 = require("type-graphql");
const RateMealResponse_1 = require("../../utils/responses/meal/RateMealResponse");
const User_1 = require("../../entity/User");
let RateMealResolver = class RateMealResolver {
    async rate(ctx) {
        const user = await User_1.User.findOne({ where: { id: ctx.payload.usr_id } });
        if (!user) {
            return {
                status: false,
                message: "User not found wtf you fucking witch !",
            };
        }
        return {
            status: true,
            message: `USER ID : ${ctx.payload.usr_id}`,
        };
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(middlewares_1.isUserAuth),
    (0, type_graphql_1.Mutation)(() => RateMealResponse_1.RateMealResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RateMealResolver.prototype, "rate", null);
RateMealResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RateMealResolver);
exports.RateMealResolver = RateMealResolver;
//# sourceMappingURL=rate.resolver.js.map