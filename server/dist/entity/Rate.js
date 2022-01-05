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
exports.Rate = void 0;
const typeorm_1 = require("typeorm");
const Meal_1 = require("./Meal");
const User_1 = require("./User");
const type_graphql_1 = require("type-graphql");
let Rate = class Rate extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Rate.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.rates, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], Rate.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Meal_1.Meal),
    (0, typeorm_1.ManyToOne)(() => Meal_1.Meal, (meal) => meal.rates, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Meal_1.Meal)
], Rate.prototype, "meal", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rate.prototype, "created_at", void 0);
Rate = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)("rates")
], Rate);
exports.Rate = Rate;
//# sourceMappingURL=Rate.js.map