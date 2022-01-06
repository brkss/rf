"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStatsMeal = void 0;
const Meal_1 = require("../../entity/Meal");
const moment_1 = __importDefault(require("moment"));
const checkStatsMeal = async () => {
    const meals = await Meal_1.Meal.find();
    const mealsTime = meals.map((meal) => ({
        id: meal.id,
        start: (0, moment_1.default)(meal.start, "hh:mm:ss a"),
        end: (0, moment_1.default)(meal.end, "hh:mm:ss a"),
    }));
    let now = new Date().toLocaleTimeString("en-EN", {
        timeZone: "Africa/Casablanca",
    });
    now = "20:10:00 pm";
    const _now = (0, moment_1.default)(now, "hh:mm:ss a");
    for (let m of mealsTime) {
        if (_now.isBetween(m.start, m.end)) {
            return m;
        }
    }
    let target = null;
    for (let meal of mealsTime) {
        if (meal.start.diff(_now) < 0) {
            if (target) {
                if (meal.start.diff(target.start) > 0)
                    target = meal;
            }
            else
                target = meal;
        }
    }
    if (target)
        return target;
    for (let meal of mealsTime) {
        if (meal.start.subtract(1, "days").diff(_now) < 0) {
            if (target) {
                if (meal.start
                    .subtract(1, "days")
                    .diff(target.start.subtract(1, "days")) > 0)
                    target = {
                        id: meal.id,
                        start: meal.start.subtract(1, "day"),
                        end: meal.end.subtract(1, "day"),
                    };
            }
            else
                target = {
                    id: meal.id,
                    start: meal.start.subtract(1, "day"),
                    end: meal.end.subtract(1, "day"),
                };
        }
    }
    return target;
};
exports.checkStatsMeal = checkStatsMeal;
//# sourceMappingURL=stats.checker.js.map