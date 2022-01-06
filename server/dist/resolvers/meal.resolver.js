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
exports.MealResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Meal_1 = require("../entity/Meal");
const MealTimeResponse_1 = require("../utils/responses/meal/MealTimeResponse");
const meal_checker_1 = require("../utils/checker/meal.checker");
let MealResolver = class MealResolver {
    tping() {
        return "tpong !";
    }
    async mealTime() {
        const targetResp = await (0, meal_checker_1.checkTargetMeal)();
        console.log("target -> ", targetResp.target.id);
        const m = await Meal_1.Meal.findOne({ where: { id: targetResp.target.id } });
        return {
            meal: m,
            is_current: targetResp.is_current,
            is_tomorrow: targetResp.is_tomorrow,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MealResolver.prototype, "tping", null);
__decorate([
    (0, type_graphql_1.Query)(() => MealTimeResponse_1.MealTimeResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MealResolver.prototype, "mealTime", null);
MealResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MealResolver);
exports.MealResolver = MealResolver;
//# sourceMappingURL=meal.resolver.js.map