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
exports.MealTimeResponse = void 0;
const type_graphql_1 = require("type-graphql");
const Meal_1 = require("../../../entity/Meal");
let MealTimeResponse = class MealTimeResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], MealTimeResponse.prototype, "is_current", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], MealTimeResponse.prototype, "is_tomorrow", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Meal_1.Meal),
    __metadata("design:type", Meal_1.Meal)
], MealTimeResponse.prototype, "meal", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Meal_1.Meal),
    __metadata("design:type", Meal_1.Meal)
], MealTimeResponse.prototype, "meal_before", void 0);
MealTimeResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], MealTimeResponse);
exports.MealTimeResponse = MealTimeResponse;
//# sourceMappingURL=MealTimeResponse.js.map