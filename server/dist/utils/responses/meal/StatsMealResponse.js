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
exports.StatsMealResponse = void 0;
const type_graphql_1 = require("type-graphql");
let StatsMealResponse = class StatsMealResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], StatsMealResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], StatsMealResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Stats], { nullable: true }),
    __metadata("design:type", Array)
], StatsMealResponse.prototype, "stats", void 0);
StatsMealResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], StatsMealResponse);
exports.StatsMealResponse = StatsMealResponse;
let Stats = class Stats {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Stats.prototype, "count", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Stats.prototype, "ident", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Stats.prototype, "percent", void 0);
Stats = __decorate([
    (0, type_graphql_1.ObjectType)()
], Stats);
//# sourceMappingURL=StatsMealResponse.js.map