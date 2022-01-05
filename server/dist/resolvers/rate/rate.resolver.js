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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateMealResolver = void 0;
const middlewares_1 = require("../../utils/middlewares");
const type_graphql_1 = require("type-graphql");
const RateMealResponse_1 = require("../../utils/responses/meal/RateMealResponse");
const entity_1 = require("../../entity");
const moment_1 = __importDefault(require("moment"));
const meal_resolver_1 = require("../meal.resolver");
const typeorm_1 = require("typeorm");
let RateMealResolver = class RateMealResolver {
    async rate(expression, ctx) {
        if (!expression) {
            return {
                status: false,
                message: "Invalid data !",
            };
        }
        const user = await entity_1.User.findOne({ where: { id: ctx.payload.usr_id } });
        if (!user) {
            return {
                status: false,
                message: "User not found wtf you fucking witch !",
            };
        }
        const mealResolver = new meal_resolver_1.MealResolver();
        const mealTime = await mealResolver.mealTime();
        if (!mealTime || !mealTime.is_current || !mealTime.meal) {
            return {
                status: false,
                message: "Not meal time !",
            };
        }
        const mealStart = (0, moment_1.default)(mealTime.meal.start, "hh:mm:ss a");
        const mealEnd = (0, moment_1.default)(mealTime.meal.end, "hh:mm:ss a");
        const rateRecord = await entity_1.Rate.find({
            where: {
                user: user,
                meal: mealTime.meal,
                created_at: (0, typeorm_1.Between)(mealStart.toDate(), mealEnd.toDate()),
            },
        });
        console.log("rates => ", rateRecord);
        if (rateRecord.length > 0) {
            return {
                status: false,
                message: "You already rated on this meal !",
            };
        }
        const rate = new entity_1.Rate();
        rate.meal = mealTime.meal;
        rate.user = user;
        rate.expression = expression;
        await rate.save();
        return {
            status: true,
            message: "Thank you for rating !",
        };
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(middlewares_1.isUserAuth),
    (0, type_graphql_1.Mutation)(() => RateMealResponse_1.RateMealResponse),
    __param(0, (0, type_graphql_1.Arg)("expression")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RateMealResolver.prototype, "rate", null);
RateMealResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RateMealResolver);
exports.RateMealResolver = RateMealResolver;
//# sourceMappingURL=rate.resolver.js.map