"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealBefore = exports.getTargetedMeal = void 0;
const moment_1 = __importDefault(require("moment"));
const Meal_1 = require("../../entity/Meal");
const getTargetedMeal = async () => {
    let now = new Date().toLocaleTimeString("en-EN", {
        timeZone: "Africa/Casablanca",
    });
    const _now = (0, moment_1.default)(now, "hh:mm:ss a");
    const meals = await Meal_1.Meal.find();
    const mealsTime = meals.map((meal) => ({
        id: meal.id,
        start: (0, moment_1.default)(meal.start, "hh:mm:ss a"),
        end: (0, moment_1.default)(meal.end, "hh:mm:ss a"),
    }));
    let target = null;
    for (let meal of mealsTime) {
        if (_now.isBetween(meal.start, meal.end)) {
            return {
                target: meal,
                meal_before: await (0, exports.mealBefore)(target.start),
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
        return {
            target: target,
            meal_before: await (0, exports.mealBefore)(target.start),
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
    return {
        target: target,
        meal_before: await (0, exports.mealBefore)(target.start.add(1, "day")),
        is_current: false,
        is_tomorrow: true,
    };
};
exports.getTargetedMeal = getTargetedMeal;
const mealBefore = async (start) => {
    const meals = await Meal_1.Meal.find();
    const mealsTime = meals.map((meal) => ({
        id: meal.id,
        start: (0, moment_1.default)(meal.start, "hh:mm:ss a"),
        end: (0, moment_1.default)(meal.end, "hh:mm:ss a"),
    }));
    let target = null;
    for (let meal of mealsTime) {
        if (start.isAfter(meal.start) || start.isSame(meal.start)) {
            if (target) {
                if (target.start.isBefore(meal.start) ||
                    target.start.isSame(meal.start))
                    target = meal;
            }
            else
                target = meal;
        }
    }
    return await Meal_1.Meal.findOne({ where: { id: target.id } });
};
exports.mealBefore = mealBefore;
//# sourceMappingURL=meal.helper.js.map