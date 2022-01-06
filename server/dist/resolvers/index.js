"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsResolver = exports.RateMealResolver = exports.MealResolver = exports.UserResolver = void 0;
var user_resolver_1 = require("./user.resolver");
Object.defineProperty(exports, "UserResolver", { enumerable: true, get: function () { return user_resolver_1.UserResolver; } });
var meal_resolver_1 = require("./meal.resolver");
Object.defineProperty(exports, "MealResolver", { enumerable: true, get: function () { return meal_resolver_1.MealResolver; } });
var rate_resolver_1 = require("./rate/rate.resolver");
Object.defineProperty(exports, "RateMealResolver", { enumerable: true, get: function () { return rate_resolver_1.RateMealResolver; } });
var stats_resolver_1 = require("./rate/stats.resolver");
Object.defineProperty(exports, "StatsResolver", { enumerable: true, get: function () { return stats_resolver_1.StatsResolver; } });
//# sourceMappingURL=index.js.map