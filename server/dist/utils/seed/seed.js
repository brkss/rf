"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meals_1 = require("./meals");
const typeorm_1 = require("typeorm");
(async () => {
    await (0, typeorm_1.createConnection)();
    await (0, meals_1.dropMeals)();
    await (0, meals_1.seedMeals)();
})();
//# sourceMappingURL=seed.js.map