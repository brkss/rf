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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Meal_1 = require("../entity/Meal");
const moment_1 = __importDefault(require("moment"));
const MealTimeResponse_1 = require("../utils/responses/meal/MealTimeResponse");
let MealResolver = class MealResolver {
    tping() {
        return "tpong !";
    }
    async mealTime() {
        let now = new Date().toLocaleTimeString("en-EN", {
            timeZone: "Africa/Casablanca",
        });
        now = "12:30:00 pm";
        const _now = (0, moment_1.default)(now, "hh:mm:ss a");
        const meals = await Meal_1.Meal.find();
        const mealsTime = meals.map((meal) => ({
            id: meal.id,
            start: (0, moment_1.default)(meal.start, "hh:mm:ss a"),
            end: (0, moment_1.default)(meal.end, "hh:mm:ss a"),
        }));
        let target;
        for (let meal of mealsTime) {
            if (_now.isBetween(meal.start, meal.end)) {
                const m = await Meal_1.Meal.findOne({ where: { id: meal.id } });
                return {
                    meal: m,
                    is_current: true,
                    is_tomorrow: false,
                };
            }
        }
        for (let meal of mealsTime) {
            if (meal.start.diff(_now) > 0) {
                if (target) {
                    if (meal.start.diff(target.start) < 0)
                        target = meal;
                }
                else
                    target = meal;
            }
        }
        if (target) {
            const m = await Meal_1.Meal.findOne({ where: { id: target.id } });
            return {
                meal: m,
                is_tomorrow: false,
                is_current: false,
            };
        }
        for (let meal of mealsTime) {
            if (meal.start.add(1, "days").diff(_now) > 0) {
                if (target) {
                    if (meal.start.add(1, "days").diff(target.start.add(1, "days")) < 0)
                        target = meal;
                }
                else
                    target = meal;
            }
        }
        const m = await Meal_1.Meal.findOne({ where: { id: target.id } });
        return {
            meal: m,
            is_current: false,
            is_tomorrow: true,
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