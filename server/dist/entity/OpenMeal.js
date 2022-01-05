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
exports.OpenMeal = void 0;
const typeorm_1 = require("typeorm");
const Meal_1 = require("./Meal");
let OpenMeal = class OpenMeal extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OpenMeal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OpenMeal.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OpenMeal.prototype, "is_open", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Meal_1.Meal, (meal) => meal.openMeals, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Meal_1.Meal)
], OpenMeal.prototype, "meal", void 0);
OpenMeal = __decorate([
    (0, typeorm_1.Entity)("open_meals")
], OpenMeal);
exports.OpenMeal = OpenMeal;
//# sourceMappingURL=OpenMeal.js.map