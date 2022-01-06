"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStats = exports.checkStatsMeal = void 0;
const entity_1 = require("../../entity");
const moment_1 = __importDefault(require("moment"));
const Rate_1 = require("../types/Rate");
const checkStatsMeal = async () => {
    const meals = await entity_1.Meal.find();
    const mealsTime = meals.map((meal) => ({
        id: meal.id,
        start: (0, moment_1.default)(meal.start, "hh:mm:ss a"),
        end: (0, moment_1.default)(meal.end, "hh:mm:ss a"),
    }));
    let now = new Date().toLocaleTimeString("en-EN", {
        timeZone: "Africa/Casablanca",
    });
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
const generateStats = (recs) => {
    let stats = Rate_1.RATES.map((r) => ({
        ident: r,
        count: recs.filter((rec) => rec.expression == r).length,
        percent: 0,
    }));
    let count = 0;
    stats.map((s) => {
        count += s.count;
    });
    if (recs.length == 0)
        return stats;
    stats = stats.map((s) => ({
        count: s.count,
        ident: s.ident,
        percent: (s.count * 100) / count,
    }));
    return stats;
};
exports.generateStats = generateStats;
//# sourceMappingURL=stats.checker.js.map