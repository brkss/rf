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
exports.StatsResolver = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const entity_1 = require("../../entity");
const stats_checker_1 = require("../../utils/checker/stats.checker");
const StatsMealResponse_1 = require("../../utils/responses/meal/StatsMealResponse");
const Rate_1 = require("../../utils/types/Rate");
let StatsResolver = class StatsResolver {
    async mealStats() {
        const target = await (0, stats_checker_1.checkStatsMeal)();
        if (!target) {
            return {
                status: false,
                message: "Something went wrong !",
            };
        }
        const start = target.start;
        const end = target.end;
        const meal = await entity_1.Meal.findOne({ where: { id: target.id } });
        const records = await entity_1.Rate.find({
            where: {
                meal: meal,
                created_at: (0, typeorm_1.Between)(start.toDate(), end.toDate()),
            },
        });
        console.log("records : ", records);
        gen(records);
        return {
            status: true,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => StatsMealResponse_1.StatsMealResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "mealStats", null);
StatsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], StatsResolver);
exports.StatsResolver = StatsResolver;
const gen = async (recs) => {
    const stats = Rate_1.RATES.map((r) => ({
        ident: r,
        count: recs.filter((rec) => rec.expression == r).length,
    }));
    console.log("generated stats : ", stats);
};
//# sourceMappingURL=stats.resolver.js.map