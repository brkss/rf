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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateMealResolver = void 0;
const middlewares_1 = require("../../utils/middlewares");
const type_graphql_1 = require("type-graphql");
const RateMealResponse_1 = require("../../utils/responses/meal/RateMealResponse");
let RateMealResolver = class RateMealResolver {
    rate() {
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(middlewares_1.isUserAuth),
    (0, type_graphql_1.Mutation)(() => RateMealResponse_1.RateMealResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RateMealResolver.prototype, "rate", null);
RateMealResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RateMealResolver);
exports.RateMealResolver = RateMealResolver;
//# sourceMappingURL=rate.resolver.js.map